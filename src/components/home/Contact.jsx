import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from '../ui/toast'; // adjust path to match your setup

const schema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not be longer than 50 characters'),
  email: z.string().email('Invalid email address'),
  feedback: z
    .string()
    .min(10, 'Message must contain at least 10 characters'),
});

const contactInfo = [
  {
    icon: MapPin,
    title: 'Head office',
    detail: '14 Milverton Road, Umuahia, Abia State',
  },
  {
    icon: Phone,
    title: 'Phone',
    detail: '+234 800 000 0000',
    isLink: true,
    href: 'tel:+2348000000000',
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'hello@cleanabia.ng',
    isLink: true,
    href: 'mailto:hello@cleanabia.ng',
  },
  {
    icon: Clock,
    title: 'Office hours',
    detail: 'Mon–Fri, 8am–5pm WAT',
  },
];

export default function ContactSection() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.add({
      title: 'Success !!',
      description: `Hello ${data.name}, your message has been sent successfully.`,
    });
    reset();
  };

  return (
    <section className="bg-[#eaf0e9] py-16 px-6 md:px-12 font-sans text-[#0c2e22]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-4 h-[1.5px] bg-[#0c2e22] inline-block" />
            <span className="text-xs font-semibold tracking-widest text-[#0c2e22] uppercase">
              CONTACT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0c2e22] mb-4">
            Get in touch with the CleanAbia team
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Questions about a report, a payout, or partnering a recycling zone with us — reach out and we'll get back within a business day.
          </p>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Information Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="divide-y divide-gray-100">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 ${
                      index === 0 ? 'pb-6' : index === contactInfo.length - 1 ? 'pt-6' : 'py-6'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#e2f0e8] text-[#154d38] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0c2e22] mb-0.5">
                        {item.title}
                      </h3>
                      {item.isLink ? (
                        <a
                          href={item.href}
                          className="text-gray-500 text-sm hover:text-[#0c2e22] transition-colors"
                        >
                          {item.detail}
                        </a>
                      ) : (
                        <p className="text-gray-500 text-sm">{item.detail}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#0c2e22] mb-6">
              Send a message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#0c2e22] mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register('name')}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#154d38] focus:ring-1 focus:ring-[#154d38] transition-all"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-[#0c2e22] mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  {...register('email')}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#154d38] focus:ring-1 focus:ring-[#154d38] transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#0c2e22] mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  {...register('feedback')}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#154d38] focus:ring-1 focus:ring-[#154d38] transition-all resize-y"
                />
                {errors.feedback && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.feedback.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#0d3b29] hover:bg-[#072419] text-white font-medium py-3.5 px-6 rounded-full transition-colors duration-200 text-sm mt-2"
              >
                Send message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}