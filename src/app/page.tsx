import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="mt-8 md:mt-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text + CTA */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Boost Your Local SEO
          </h1>
          <p className="mt-4 text-lg text-gray-700 md:max-w-md">
            Get actionable insights and easy-to-follow recommendations to
            improve your website’s ranking and stand out locally.
          </p>
          <div className="mt-6">
            {/* Updated to link to the registration page */}
            <Link
              href="/register"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          {/* Replace with your own image path or an illustration component */}
          <Image
            src="/assets/hero-illustration.png"
            alt="SEO Audit Illustration"
            width={500}
            height={400}
            priority
          />
        </div>
      </section>

      {/* Features / Steps Section */}
      <section className="mt-16 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            How It Works
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Simple steps to get your SEO audits up and running.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">Sign Up</h3>
              <p className="mt-2 text-gray-600">
                Create your free account and enter basic details about your
                business or website.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">
                Run Your Audit
              </h3>
              <p className="mt-2 text-gray-600">
                Start a comprehensive SEO audit with a single click—no technical
                knowledge required.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">
                Get Insights
              </h3>
              <p className="mt-2 text-gray-600">
                Receive a detailed report and competitor comparison, complete
                with actionable steps.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
