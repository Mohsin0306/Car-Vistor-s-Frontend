import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Clean Professional Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

      {/* Navigation - Imported from Components */}
      <Navbar currentPage="about" />

      {/* About Us Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 pt-32 sm:pt-40">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-[rgba(37,150,190,1)]">Car Vistors</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional VIN Decoding and Vehicle Information Services
          </p>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              Car Vistors is a professional vehicle information service provider specializing in Vehicle Identification Number (VIN) decoding and comprehensive vehicle analysis. Our services are designed to provide accurate, reliable, and legally compliant vehicle information to consumers, businesses, and professionals in the automotive industry.
            </p>
            <p className="mb-4">
              We operate in compliance with all applicable United States federal and state laws governing vehicle information services, data privacy, and consumer protection. Our services utilize publicly available vehicle information databases and comply with the regulations set forth by the National Highway Traffic Safety Administration (NHTSA) and other relevant federal agencies.
            </p>
            <p>
              All vehicle information provided through our services is obtained from legitimate sources and is presented for informational purposes only. We do not guarantee the accuracy, completeness, or timeliness of any vehicle information, and users are advised to verify all information independently before making any decisions based on such information.
            </p>
          </div>
        </div>

        {/* Legal Compliance Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal Compliance and Regulations</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Federal Motor Vehicle Safety Standards (FMVSS)</h3>
              <p className="mb-2">
                Our VIN decoding services comply with the Federal Motor Vehicle Safety Standards established under Title 49 of the Code of Federal Regulations (49 CFR Part 565). The VIN system used in our services follows the standardized format required by the National Highway Traffic Safety Administration (NHTSA) for all vehicles manufactured for sale in the United States.
              </p>
              <p>
                Pursuant to 49 CFR Part 565, Vehicle Identification Number (VIN) requirements, all vehicles must have a unique 17-character VIN that provides information about the vehicle's manufacturer, model, year, and other identifying characteristics. Our services decode this information in accordance with these federal regulations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Driver's Privacy Protection Act (DPPA)</h3>
              <p className="mb-2">
                Car Vistors operates in full compliance with the Driver's Privacy Protection Act (18 U.S.C. § 2721 et seq.), which restricts the disclosure of personal information from motor vehicle records. Our services do not provide, access, or disclose personal information protected under the DPPA, including names, addresses, telephone numbers, social security numbers, or other personally identifiable information.
              </p>
              <p>
                We only provide vehicle identification and specification information that is publicly available and does not constitute protected personal information under the DPPA. All data processing and storage practices comply with DPPA requirements and applicable state privacy laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fair Credit Reporting Act (FCRA)</h3>
              <p className="mb-2">
                Our services are not consumer reporting agencies as defined under the Fair Credit Reporting Act (15 U.S.C. § 1681 et seq.). The vehicle information we provide does not constitute a consumer report and is not intended to be used for credit, employment, insurance, or other FCRA-covered purposes.
              </p>
              <p>
                Users are expressly prohibited from using our services or the information provided therein for any purpose covered by the FCRA, including but not limited to determining eligibility for credit, employment, insurance, or housing. Any such use is strictly prohibited and may result in legal action.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">State Vehicle Information Laws</h3>
              <p className="mb-2">
                Car Vistors complies with all applicable state laws governing vehicle information services, including but not limited to state-specific regulations regarding VIN verification, vehicle history reporting, and consumer protection requirements.
              </p>
              <p>
                Certain states may have additional requirements or restrictions on vehicle information services. Users are responsible for ensuring their use of our services complies with all applicable state and local laws in their jurisdiction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Privacy and Security</h3>
              <p className="mb-2">
                We maintain reasonable security measures to protect user data and vehicle information in accordance with applicable data protection laws, including state data breach notification laws and federal privacy regulations.
              </p>
              <p>
                All user information is handled in accordance with our Privacy Policy and Terms of Service. We do not sell, rent, or otherwise disclose user information to third parties except as required by law or as necessary to provide our services.
              </p>
            </div>
          </div>
        </div>

        {/* Service Limitations */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Limitations and Disclaimers</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              <strong>Accuracy Disclaimer:</strong> While we strive to provide accurate vehicle information, we do not guarantee the accuracy, completeness, or reliability of any information provided through our services. Vehicle information is obtained from third-party sources and may contain errors or omissions.
            </p>
            <p>
              <strong>No Warranty:</strong> Our services are provided "as is" without warranty of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              <strong>Limitation of Liability:</strong> Car Vistors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services or reliance on any information provided therein.
            </p>
            <p>
              <strong>Prohibited Uses:</strong> Users may not use our services for any illegal purpose or in violation of any applicable laws or regulations. Prohibited uses include, but are not limited to, fraud, identity theft, or any activity that violates the rights of others.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              For questions regarding our services, legal compliance, or this About Us page, please contact us through our official channels. We are committed to maintaining transparency and compliance with all applicable laws and regulations.
            </p>
            <p>
              Car Vistors reserves the right to modify this About Us page and our terms of service at any time. Users are encouraged to review these documents periodically to stay informed of any changes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Imported from Components */}
      <Footer />
    </div>
  )
}

export default AboutUs
