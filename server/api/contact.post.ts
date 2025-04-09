import bodySchema from '../utils/contactSchema'

export default defineEventHandler(async (event) => {
  const form = await readValidatedBody(event, bodySchema.parse)

  if (form.checkbox2 || !form.checkbox1) {
    // silently fail, this is the bot test
    return 'Bip boop, did you forget to check something ?'
  }

  const { sendMail } = useNodeMailer()

  const text = `Someone has left a new message on BeatenIMMO!

Lastname: ${form.lastname.replace('\n', ' ')}
FirstName: ${form.firstname.replace('\n', ' ')}
Email: ${form.email}
Phone: ${form.phone.replace('\n', ' ')}
Spoken Languages: ${form.locales.join(', ')}
URL from which the message was sent: ${form.from}

Message
-------
${form.message}
-------

Automatically sent from BeatenIMMO.ch`

  try {
    await sendMail({
      subject: 'New Message on BeatenIMMO',
      text,
      to: 'twinkelmann@naito.one',
    })
  } catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      message: 'Internal server error',
    })
  }
})
