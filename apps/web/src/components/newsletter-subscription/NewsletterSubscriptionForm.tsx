'use client'

import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { subscribeToNewsletter } from "actions/newsletter-subscription"
import { Form, Input } from "components/form"
import { Button } from "components/button"

const NewsletterSubscriptionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const onSubmit = async (formData: { email: string }) => {
    try {
      await subscribeToNewsletter(formData)
      toast.success("You've successfully subscribed to the newsletter!", {
        duration: 5000,
        position: "top-center",
        className: "custom-toast",
        icon: "💌",
      })
      reset()
    } catch (e) {
      throw new Error("Failed to subscribe to newsletter")
    }
  }

  return (
    <Form
      name='newsletter-subscription'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id='email'
        label="Email"
        name="email"
        type="email"
        placeholder="adoring@fan.com"
        register={register}
        errors={errors}
        validationSchema={{
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address",
          },
        }}
      />
      <Button
        type="submit"
        variant='primary'
        disabled={isSubmitting}
      >Subscribe</Button>
    </Form>
  )
}

export { NewsletterSubscriptionForm }