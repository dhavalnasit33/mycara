// // components/ContactUs.jsx
// import React from 'react';
// import ContactCard from '../components/contactus/ContactCard';
// import Section from '../components/ui/Section';
// import Row from '../components/ui/Row';
// import { MapPinIcon, PhoneIcon } from 'lucide-react';
// import { EnvelopeIcon } from '@heroicons/react/24/outline';
// import MapForm from '../components/contactus/MapForm';


// const ContactUs = () => {
//   return (
//     <></>
//     <Section >
//         <Row>
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-[30px]">
//         <ContactCard
//          icon={<MapPinIcon  />}
//           title="Visit Us"
//           description="215, Dhara Arcade, near lajamani chowk (Surat)."
//           linkText="View on Google Maps"
//           linkHref="https://maps.google.com"
//         />
//         <ContactCard
//           icon={<EnvelopeIcon/>}
//           title="Email Us"
//           description="Visit our office HR"
//           linkText="Sales@untitledul.com"
//           linkHref="mailto:Sales@uniteddul.com"
//         />
//         <ContactCard
//           icon={<PhoneIcon/>}
//           title="Call Us"
//           description="Mon-Fri 8am to 6pm"
//           linkText="+1[155]000-0000"
//           linkHref="tel:+1155000000"
//         />
//       </div>
//       </Row>
//     </Section>
//     <MapForm/>
    
//   );
// };

// export default ContactUs;

// components/ContactUs.jsx
import React from 'react';
import ContactCard from '../components/contactus/ContactCard';
import Section from '../components/ui/Section';
import Row from '../components/ui/Row';
import { MapPinIcon, PhoneIcon } from 'lucide-react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import MapForm from '../components/contactus/MapForm';
import FAQ from '../components/contactus/Faq';

const ContactUs = () => {
  return (
    <>
      <Section >
        <Row className='xl:max-w-[1122px] grid grid-cols-1 md:grid-cols-3 gap-[30px]'>
          {/* <div className="max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-[30px]"> */}
            <ContactCard
              icon={<MapPinIcon />}
              title="Visit Us"
              description="215, Dhara Arcade, near lajamani chowk (Surat)."
              linkText="View on Google Maps"
              linkHref="https://maps.google.com"
            />
            <ContactCard
              icon={<EnvelopeIcon />}
              title="Email Us"
              description="Visit our office HR"
              linkText="Sales@untitledul.com"
              linkHref="mailto:Sales@uniteddul.com"
            />
            <ContactCard
              icon={<PhoneIcon />}
              title="Call Us"
              description="Mon-Fri 8am to 6pm"
              linkText="+1[155]000-0000"
              linkHref="tel:+1155000000"
            />
          {/* </div> */}
        </Row>
      </Section>

      <MapForm />
      <FAQ/>
    </>
  );
};

export default ContactUs;
