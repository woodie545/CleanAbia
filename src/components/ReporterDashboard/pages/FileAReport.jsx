import {
  createReport,
  uploadReportImage,
} from '../../../services/reports'

const report =
  await createReport({
    title,
    description,
    category,
    address,
    lga,
    latitude,
    longitude,
  })

for (const image of images) {
  await uploadReportImage(
    report.id,
    image
  )
}
