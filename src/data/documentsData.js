import { supabase } from '../lib/supabaseClient.js'

const STORAGE_BUCKET = 'documents'

export const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'xlsx', 'jpg', 'jpeg', 'png', 'dwg']
export const MAX_FILE_SIZE_MB = 20

export async function fetchDocumentsData() {
  const { data, error } = await supabase
    .from('documents')
    .select('id, file_name, category, file_path, file_type, uploaded_at')
    .order('uploaded_at', { ascending: false })

  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    name: row.file_name,
    category: row.category,
    fileType: row.file_type || 'FILE',
    uploadedDate: row.uploaded_at,
    downloadUrl: supabase.storage.from(STORAGE_BUCKET).getPublicUrl(row.file_path).data.publicUrl,
  }))
}

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
}

export async function uploadDocument({ file, category }) {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error(`Unsupported file type. Allowed: PDF, DOCX, XLSX, JPG, PNG, DWG.`)
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error(`File is too large. Max size is ${MAX_FILE_SIZE_MB} MB.`)
  }

  const filePath = `${category}/${Date.now()}-${sanitizeFileName(file.name)}`

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, { cacheControl: '3600', upsert: false })

  if (uploadError) throw uploadError

  const fileType = extension === 'jpeg' ? 'JPG' : extension.toUpperCase()

  const { error: insertError } = await supabase.from('documents').insert({
    file_name: file.name,
    category,
    file_path: filePath,
    file_type: fileType,
  })

  if (insertError) throw insertError
}
