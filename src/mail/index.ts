import { join } from "path"
import pug from "pug"
import { sendTestEmail } from "./connection"

const templatesPath = join(__dirname, "templates")

export const send_register_email = async (
  to: string,
  subject?: string,
  text?: string,
  verificationUrl?: string
) => {
  const compiledTemplate = pug.compileFile(join(templatesPath, "register.pug"))

  const sendHtml = compiledTemplate({ to, verificationUrl })

  return sendTestEmail({ to, subject, text, html: sendHtml })
}
export const send_order_creation_email = async (data: any) => {
  const compiledTemplate = pug.compileFile(
    join(templatesPath, "order_confirmation.pug")
  )

  const sendHtml = compiledTemplate({
    userEmail: data.user,
    gigName: data.gigName,
    orderId: data.orderId,
    price: data.price,
    status: data.status,
  })

  return sendTestEmail({ to: data.user, html: sendHtml })
}
export const send_order_cancellation_email = async (data: any) => {
  const compiledTemplate = pug.compileFile(
    join(templatesPath, "order_cancellation.pug")
  )

  const sendHtml = compiledTemplate({
    userEmail: data.user,
    gigName: data.gigName,
    orderId: data.orderId,
    price: data.price,
    status: data.status,
  })

  return sendTestEmail({ to: data.user, html: sendHtml })
}
