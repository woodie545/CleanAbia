import { supabase } from '../lib/supabase'

export async function createReport({
  title,
  description,
  category,
  priority = 'medium',
  address,
  lga,
  latitude,
  longitude,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const { data, error } = await supabase
    .from('reports')
    .insert({
      reporter_id: user.id,
      title,
      description,
      category,
      priority,
      address,
      lga,
      latitude,
      longitude,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}


export async function getMyReports() {
  const { data, error } = await supabase
    .from('reports')
    .select(`
      *,
      report_images (
        id,
        storage_path,
        created_at
      )
    `)
    .order('created_at', {
      ascending: false,
    })

  if (error) {
    throw error
  }

  return data
}


export async function getReport(reportId) {
  const { data, error } = await supabase
    .from('reports')
    .select(`
      *,
      report_images (
        id,
        storage_path,
        created_at
      )
    `)
    .eq('id', reportId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function uploadReportImage(
  reportId,
  file
) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const extension =
    file.name.split('.').pop()

  const fileName =
    `${crypto.randomUUID()}.${extension}`

  const filePath =
    `${reportId}/${fileName}`

  const { error: uploadError } =
    await supabase.storage
      .from('report-images')
      .upload(filePath, file)

  if (uploadError) {
    throw uploadError
  }

  const { data, error } =
    await supabase
      .from('report_images')
      .insert({
        report_id: reportId,
        storage_path: filePath,
      })
      .select()
      .single()

  if (error) {
    throw error
  }

  return data
}
