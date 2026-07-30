"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "./actions";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const inputVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      const result = await sendEmail(formData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
        reset();
      }
    });
  };

  return (
    <motion.form
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface border border-border rounded-lg p-6 font-mono text-sm space-y-4"
    >
      <motion.div variants={inputVariants}>
        <label htmlFor="name" className="block text-muted mb-1">
          _name:
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full bg-bg border border-border rounded px-3 py-2 text-ink focus:outline-none focus:ring-1 focus:ring-teal"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </motion.div>
      <motion.div variants={inputVariants}>
        <label htmlFor="email" className="block text-muted mb-1">
          _email:
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          className="w-full bg-bg border border-border rounded px-3 py-2 text-ink focus:outline-none focus:ring-1 focus:ring-teal"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </motion.div>
      <motion.div variants={inputVariants}>
        <label htmlFor="message" className="block text-muted mb-1">
          _message:
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message", { required: "Message is required" })}
          className="w-full bg-bg border border-border rounded px-3 py-2 text-ink focus:outline-none focus:ring-1 focus:ring-teal"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </motion.div>
      <motion.div variants={inputVariants}>
        <button
          type="submit"
          disabled={isPending}
          className="font-mono text-xs bg-amber text-bg px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "sending..." : "submit-message"}
        </button>
      </motion.div>
    </motion.form>
  );
}
