import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Hero from '@/components/layout/Hero'
import Image from 'next/image'
import { playfair } from './fonts'
import Link from 'next/link'

export const metadata = {
  title: 'Agistrea • Coming Soon',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProd = process.env.NEXT_PUBLIC_AGISTREA_ENV === 'production'

  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "2c56b7c7f3c54e73848abcf385da94d0"}'
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      {isProd ? (
        <body className={`${playfair.variable} min-h-screen bg-white`}>
          <div id="site-wrapper">
            <Hero />
            <Header />
            <main id="wrapper" className="relative max-w-[100vw]">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      ) : (
        <body className="h-screen w-screen overflow-hidden">
          <Image
            src="/assets/images/Homepage/hero-agistri-2.jpeg"
            alt="A view of the sea and small Greek houses surrounded by pine trees on Agistri island."
            fill
            className="object-cover"
          />

          <div className="header absolute z-100 flex w-screen justify-center py-3">
            <Link href="/en">
              <div className="font-serif text-3xl font-semibold text-white">Agistrea</div>
            </Link>
          </div>

          <div className="absolute top-1/2 left-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/90 px-6 py-6 text-center">
            <h2 className="text-[18px] font-semibold tracking-[0.5px] text-neutral-900">
              Be part of Agistrea
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-neutral-700">
              A small curated guide to quiet, locally run stays on Agistri is coming soon. If you’d
              like to stay there or list your place, leave your email and we’ll get in touch.
            </p>

            <form
              action="https://formsubmit.co/katharinadobiosch@gmail.com"
              method="POST"
              className="mt-4 flex flex-col gap-3 text-left"
            >
              {/* FormSubmit Einstellungen */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New interest on Agistrea" />
              <input type="hidden" name="_template" value="box" />

              {/* Checkbox-Gruppe */}
              <div className="role-group flex flex-col gap-1">
                <label className="flex items-center gap-2 text-[13px] text-neutral-700">
                  <input
                    type="checkbox"
                    name="role_host"
                    value="host"
                    className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>I’m a host</span>
                </label>

                <label className="flex items-center gap-2 text-[13px] text-neutral-700">
                  <input
                    type="checkbox"
                    name="role_guest"
                    value="guest"
                    className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>I’m looking for a locally run place to stay</span>
                </label>
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="mt-3 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-[14px] text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
              />

              {/* Button */}
              <button
                type="submit"
                className="mt-2 w-full cursor-pointer rounded-md bg-neutral-900 px-4 py-2 text-[13px] font-medium tracking-[0.5px] text-white hover:bg-neutral-800"
              >
                Notify me
              </button>
            </form>
          </div>

          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-1 text-white">
            <a
              href="https://www.instagram.com/agistrea"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[14px] tracking-[0.3px]"
            >
              <i className="fa-brands fa-instagram text-[16px] text-white"></i>
              <span className="font-weight text-white">agistrea</span>
            </a>
          </div>

          {/* Validation Script */}
          <script>
            {`
      document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector("form");
        const checkboxes = form.querySelectorAll("input[type='checkbox']");

        form.addEventListener("submit", function (e) {
          const oneChecked = Array.from(checkboxes).some(cb => cb.checked);

          if (!oneChecked) {
            e.preventDefault();

            let error = document.getElementById("role-error");
            if (!error) {
              error = document.createElement("p");
              error.id = "role-error";
              error.textContent = "Please select at least one option.";
              error.className = "text-red-600 text-[13px] mt-1";
              form.querySelector(".role-group").appendChild(error);
            }
          }
        });
      });
    `}
          </script>
        </body>
      )}
    </html>
  )
}
