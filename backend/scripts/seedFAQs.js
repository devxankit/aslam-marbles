require('dotenv').config();
const mongoose = require('mongoose');
const FAQ = require('../models/FAQ');
const connectDB = require('../config/db');

// FAQ data from frontend data files
const allFAQsData = {
  'how-it-works': [
    {
      question: 'How much is your design fee?',
      answer: 'For our domestic clients, we offer three different design services:<br /><br /><strong>Starter Pack:</strong> INR 51,000 for a customized 2D design concept of your bespoke Dream Temple.<br /><br /><strong>Premium Pack:</strong> INR 81,000, which includes a 2D concept of your Dream Temple along with a site visit.<br /><br /><strong>Pro Pack:</strong> ₹111,000, which includes a 2D layout for your Pooja Room, Temple, walls, and floors, along with working drawings and a site visit.<br /><br />Once you finalize your 2D concept, we also offer exceptional 3D rendering services, starting at INR 1.5 lakh.',
      displayOrder: 1
    },
    {
      question: 'How much time is required for designing an AMS pooja room?',
      answer: 'Designing an AMS Pooja Room typically takes 2 weeks, depending on the project scope and complexity. The production process takes an additional 3-4 months to ensure smooth operations and timely delivery.',
      displayOrder: 2
    },
    {
      question: 'What is the production time for a custom Dream Temple?',
      answer: 'The production timeline for a custom Dream Temple is 8-10 weeks, excluding:<br /><br />• The initial design phase of 10-15 days<br />• Delivery and installation (approximately 1 week)',
      displayOrder: 3
    },
    {
      question: 'Do you conduct site visits for taking measurements? What are the charges?',
      answer: 'Yes, we conduct site visits across India for a site recce. You can opt for the Premium Pack, which offers you a 2D concept along with a site visit for ₹81,000 in Jaipur, Delhi NCR, and Mumbai. For other locations in India, additional charges apply.',
      displayOrder: 4
    },
    {
      question: 'Do you deliver pan India?',
      answer: 'Yes, we deliver across India and internationally. We have dedicated delivery and installation partners who manage the entire process seamlessly.',
      displayOrder: 5
    },
    {
      question: 'Is the design fee refundable?',
      answer: 'Please note that our design fee is non-refundable but adjustable. It serves as an advance payment for the design expertise AMS brings to your project and is later deducted from your total invoice upon order placement.',
      displayOrder: 6
    },
    {
      question: 'Do custom temples cost more than ready-made ones?',
      answer: 'Customization involves crafting bespoke concepts tailored to your specific needs and preferences. Ready-made temples are standardized products. However, pricing depends on the level of craftsmanship rather than solely on customization or readiness.',
      displayOrder: 7
    },
    {
      question: 'Do you also make murtis?',
      answer: 'Yes, we offer complete pooja room solutions, including temples, murtis, and other pooja room elements like walls, flooring, and ceilings, all crafted in exquisite stonework.',
      displayOrder: 8
    },
    {
      question: 'Which marble do you use?',
      answer: 'We primarily use premium-quality Vietnam White Marble, known for its pristine finish and durability. For specific projects, we also work with other high-grade marbles.',
      displayOrder: 9
    },
    {
      question: 'Are the drawers in the temple also made of marble?',
      answer: 'The drawer fronts are clad with marble carvings that seamlessly match the temple\'s design. The internal structure is made of high-grade Centuryply boards, fitted with Hafele push-to-open channels for smooth operation. The interiors are finished with premium-quality mica, ensuring a smooth and easy-to-clean experience.',
      displayOrder: 10
    },
    {
      question: 'Is the chandelier included with the temple?',
      answer: 'No, the chandelier is not included with the temple. It can be added separately upon request as an additional feature.',
      displayOrder: 11
    }
  ],
  'murti': [
    {
      question: 'What products do you offer?',
      answer: 'We offer a variety of products including murtis, home decor items, wall art, and other stone artifacts. Each item is crafted with precision and dedication to ensure the highest quality.',
      displayOrder: 1
    },
    {
      question: 'How can I place an order?',
      answer: 'You can place an order directly through our website. Simply browse our products, add your desired items to the cart, and proceed to checkout.',
      displayOrder: 2
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards, net banking, and UPI. For international orders, we also accept PayPal and international credit cards.',
      displayOrder: 3
    },
    {
      question: 'Do you offer customization?',
      answer: 'Yes, we offer customization for certain products. Please contact our customer service team to discuss your specific requirements.',
      displayOrder: 4
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can place an order through our website or contact our customer support for assistance.',
      displayOrder: 5
    }
  ],
  'dream-temple': [
    {
      question: 'What are Dream Temples?',
      answer: 'Dream Temples are custom-designed, handcrafted marble temples created by Tilak Stone Arts. They are designed to be not just a religious space but a piece of art that reflects your spiritual values and enhances the aesthetic of your home.',
      displayOrder: 1
    },
    {
      question: 'How long does it take to create and install a Dream Temple?',
      answer: 'The process typically takes 6-8 weeks, from the design approval to final installation. The exact timeline depends on the complexity and customization of the design.',
      displayOrder: 2
    },
    {
      question: 'Do you provide installation for Dream Temples?',
      answer: 'Yes, installation is included in our service. Our team ensures that the Dream Temple is assembled and installed at your location with precision no matter where you are.',
      displayOrder: 3
    },
    {
      question: 'Are there any discounts or offers available for Dream Temples?',
      answer: 'We periodically offer limited-time discounts on ready-to-ship temples or merchandise gifts with certain designs. Contact us for current offers.',
      displayOrder: 4
    },
    {
      question: 'How do I get started with my Dream Temple?',
      answer: 'Start by filling out the "Get in Touch" form on our website. The right member from our team will then contact you to assist you with the next steps in the process, guiding you through design, customization, and installation.',
      displayOrder: 5
    },
    {
      question: 'What material do we use to create our Dream Temples?',
      answer: 'We exclusively use imported Vietnam White Marble to craft our Dream Temples, ensuring the highest quality and durability. However, upon special request and where the budget allows, we also offer the option of using high-grade Makrana Marble or other premium Italian stones to further elevate the elegance and craftsmanship of the temple.',
      displayOrder: 6
    },
    {
      question: 'Where to See your Work?',
      answer: 'You are invited to explore our work at our Experience Center, or you can view some of our past documented projects here to get a closer look at the craftsmanship and designs we offer.',
      displayOrder: 7
    }
  ],
  'tsa-international': [
    {
      question: 'What is the process for ordering a Dream Temple internationally?',
      answer: '<strong>Concept Discovery Session:</strong> Share your vision with us.<br /><br /><strong>Design Approval:</strong> Our team creates a bespoke design tailored to your requirements.<br /><br /><strong>Order Placement:</strong> Finalize the design and place your order.<br /><br /><strong>Production:</strong> The temple is meticulously crafted in our in-house facility.<br /><br /><strong>Packaging & Shipping:</strong> We ensure secure packing and ship the temple to your destination.<br /><br /><strong>DIY Installation:</strong> A comprehensive guide, video instructions, and support are provided for easy installation.',
      displayOrder: 1
    },
    {
      question: 'What is the average production and delivery time?',
      answer: 'Production typically takes 12 weeks, depending on the complexity of the design.<br /><br />Shipping times vary by location:<br />• USA: 50-55 days<br />• UK: 35-40 days<br />• Australia: 40-45 days<br />• UAE: 15-20 days<br /><br />Please note that shipping times are approximate and subject to customs clearance.',
      displayOrder: 2
    },
    {
      question: 'How are the temples packed for international shipping?',
      answer: 'We use industrial-grade wooden crates lined with protective foam to ensure your temple arrives safely. Our team also provides a detailed packaging video for transparency.',
      displayOrder: 3
    },
    {
      question: 'What happens in case of damage during shipping?',
      answer: 'All our international shipments are covered under Marine Insurance, and we take every precaution to ensure safe delivery. However, in the unlikely event of damage:<br />• Contact us immediately within 24 hours of unpacking.<br />• Depending on the insurance coverage and the extent of the damage, we offer repair or replacement options under our damage warranty.',
      displayOrder: 4
    },
    {
      question: 'What are the shipping costs?',
      answer: 'Shipping charges depend on your location, package weight, and dimensions, and they vary for every country and port. Please refer to the country-wise table above to understand the charges for different temple sizes.',
      displayOrder: 5
    },
    {
      question: 'Who will assemble the temple at my location?',
      answer: 'Our temples are designed with a nut-and-bolt system for easy assembly and can be installed by you at your residence. You\'ll receive:<br />• A comprehensive installation guide and video tutorial.<br />• Virtual assistance from our team via video call.<br />• If needed, we can coordinate with a local contractor to ensure a seamless installation.',
      displayOrder: 6
    },
    {
      question: 'Do you offer door delivery for international orders?',
      answer: 'Yes, we offer a Door Delivery option, which includes:<br />• Customs clearance.<br />• Transportation to your doorstep.<br />• All associated charges will be included in your final quote.',
      displayOrder: 7
    },
    {
      question: 'How do I ensure the temple aligns with my religious and aesthetic preferences?',
      answer: 'Our design team works closely with you during the Concept Discovery Session to incorporate:<br />• Specific religious elements (e.g., Shubh Labh, Namokar Mantra, Dharma Chakra, Swastik etc.)<br />• Aesthetic preferences, such as carvings, lighting, and finishes.<br />• Every detail is tailored to your vision.',
      displayOrder: 8
    },
    {
      question: 'What materials are used in creating the temples?',
      answer: 'For our Bespoke Dream Temple, we primarily use premium grade imported Vietnam White Marble, known for its pristine finish and durability. For specific projects, we also work with other high-grade marbles to meet unique requirements.',
      displayOrder: 9
    },
    {
      question: 'How can I track my order and shipping?',
      answer: 'You\'ll receive regular updates at every stage:<br />• Production progress.<br />• Shipping milestones (dispatch, transit, and arrival).<br />• A tracking link for real-time shipment updates.',
      displayOrder: 10
    },
    {
      question: 'What are the weight ranges for the temples?',
      answer: '• Small temples: 100-400 kg<br />• Medium temples: 400-700 kg<br />• Large temples: Over 1,000 kg<br /><br />Specific weights will be provided during the design and order process.',
      displayOrder: 11
    },
    {
      question: 'How do I get started?',
      answer: 'Begin your journey by booking a Concept Discovery Call:<br />• Share your vision with our experts.<br />• Receive a bespoke design tailored to your space and preferences.',
      displayOrder: 12
    },
    {
      question: 'What is the overall project timeline?',
      answer: 'The project timeline includes: 7-10 days for designing. 8-10 weeks for production. Shipping time depends on your destination country.',
      displayOrder: 13
    },
    {
      question: 'What are the prerequisites to start my Dream Temple journey?',
      answer: 'To start, we\'ll need your site measurements or pictures of the location where the temple will be placed. This helps us understand your space and requirements to suggest the best solution.',
      displayOrder: 14
    },
    {
      question: 'Marble is heavy. How will it be installed on wooden floors?',
      answer: 'While marble is a heavy natural stone, the weight is distributed symmetrically and evenly, causing no issues. Additionally, our Dream Temples rest on wooden plyboards, which comfortably support the weight. Many clients even place their Dream Temples on upper floors. For bespoke projects, we can coordinate with your structural engineer to assess or enhance the load-bearing capacity, if required.',
      displayOrder: 15
    },
    {
      question: 'Do I need experts for installing the temple?',
      answer: 'Small and medium-sized temples can be installed with the help of a local carpenter, using our installation manual and virtual assistance. Marble experts are not necessary.',
      displayOrder: 16
    },
    {
      question: 'What are the size classifications for Dream Temples?',
      answer: '• Small Temple: Width 3 ft - 4 ft<br />• Medium Temple: Width 4 ft - 6 ft<br />• Large Temple: Width 6 ft and above<br /><br />(All our measurements are done in feet and inches)',
      displayOrder: 17
    },
    {
      question: 'What are your payment terms?',
      answer: 'Our payment terms are:<br />• 50% advance at the time of order placement to start production.<br />• 50% balance before dispatch. These terms ensure fair practices for all agencies involved and smooth operations.',
      displayOrder: 18
    },
    {
      question: 'Are the drawers in the temple also made of marble?',
      answer: 'The drawer fronts are clad with marble carvings that seamlessly match the temple\'s design. The internal structure is made of high-grade Centuryply boards, fitted with Hafele push-to-open channels for smooth operation. The interiors are finished with premium-quality mica, ensuring a smooth and easy-to-clean experience.',
      displayOrder: 19
    },
    {
      question: 'Is the chandelier included with the temple?',
      answer: 'No, the chandelier is not included with the temple. It can be added separately upon request as an additional feature.',
      displayOrder: 20
    },
    {
      question: 'Do custom temples cost more than ready-made ones?',
      answer: 'Customization involves creating bespoke concepts tailored to your specific needs and preferences, while ready-made temples are standardized products. However, the pricing depends more on the level of craftsmanship rather than solely on whether the temple is custom or ready-made. The major difference lies in the fulfillment time: a ready-made temple can be dispatched in 10 days after quality checks, while a custom temple takes 8-10 weeks in production.',
      displayOrder: 21
    },
    {
      question: 'Do you make murtis as well?',
      answer: 'Yes, we offer complete pooja room solutions, including temples and murtis of various gods and goddesses. We also accept customization requests for murtis. It\'s important to consider the sizes and count of your murtis while designing your temple to ensure proper placement inside. Your murtis will be shipped alongside your Dream Temple for the best experience.',
      displayOrder: 22
    },
    {
      question: 'Do you build Pooja Rooms outside India?',
      answer: 'Yes, we are proud to work on sacred pooja room projects outside India, including locations like Dubai. We offer complete solutions, from walls to flooring, to create a divine pooja space. For such projects, please schedule a call with our international sales expert to discuss the scale and variety of options available for your project.',
      displayOrder: 23
    },
    {
      question: 'Do you provide Site Visits services for International Projects?',
      answer: 'Yes, we do offer site visit services in Dubai for pooja room projects. To align the details, please book a call with our international sales expert to discuss your project further.',
      displayOrder: 24
    },
    {
      question: 'Will there be lighting in my Dream Temple?',
      answer: 'Yes, one of the special features of your Dream Temple is the inbuilt ambient lighting solution. Depending on the design and concept, your temple will come with built-in LED lighting that can be customized to your electrical standards (e.g., 110V output in the USA). You\'ll simply need to follow the instructions provided and plug in the wires for easy setup.',
      displayOrder: 25
    },
    {
      question: 'Do you also do Wall Arts?',
      answer: 'Yes, for our international community, we currently offer standard wall art panels based on our unique spiritual and religious themes. At this time, we are not accepting customization requests for wall arts. However, you can have a detailed discussion with our international sales expert to explore available options.',
      displayOrder: 26
    },
    {
      question: 'Do you also have any home decor items?',
      answer: 'Yes, we offer a variety of bespoke stone artifacts. Feel free to explore our website www.shoptilakstonearts.com for some amazing collectibles to elevate your home living experience.',
      displayOrder: 27
    }
  ]
};

// Location-specific FAQs template
const getLocationFAQs = (location) => [
  {
    question: `What are your site visit charges for Pooja Rooms in ${location}?`,
    answer: `Our site visit charges for pooja room sites in ${location} are INR 21k. Post booking your site visit our expert designer and technical concern shall visit your space and provide you consultation.`,
    displayOrder: 1
  },
  {
    question: `How do you install a marble temple at my home in ${location}?`,
    answer: '',
    displayOrder: 2
  },
  {
    question: `I live on 20th Floor are there any extra charges for the delivery?`,
    answer: `Once we start working on your project, we shall provide you the approximate costs specially tailored for the location of your home to ensure smooth and fair operations. Our installation team shall work relentlessly to ensure you have you temple installed beautifully no matter your location.`,
    displayOrder: 3
  },
  {
    question: `Do you provide installation for Dream Temples in ${location}?`,
    answer: `Yes, installation is included in our service. Over the past 25 years, we have delivered in different areas of ${location}. Our team ensures that the Dream Temple is assembled and installed at your location with precision no matter where you are.`,
    displayOrder: 4
  },
  {
    question: `How long does it take to create and install a Dream Temple in ${location}?`,
    answer: `The design process generally takes 10-15 days, the production process typically takes 6-8 weeks, post which delivery and installation takes 7-10 days. So all in all it takes around 2-3 months from the design approval to final installation. The exact timeline depends on the complexity and customization of the design.`,
    displayOrder: 5
  },
  {
    question: `How long does it take for shipping your temples to ${location}?`,
    answer: `It depends on the order size and the urgency of the project, in a normal scenario your temple shall reach you in 4-5 days once its ready.`,
    displayOrder: 6
  },
  {
    question: `What material do we use to create our Dream Temples in ${location}?`,
    answer: `We exclusively use imported Vietnam White Marble to craft our Dream Temples, ensuring the highest quality and durability. However, upon special request and where the budget allows, we also offer the option of using high-grade Makrana Marble or other premium Italian stones to further elevate the elegance and craftsmanship of the temple.`,
    displayOrder: 7
  },
  {
    question: `Where have you worked in ${location}?`,
    answer: `We have worked all around ${location} in various locations. You are invited to explore our work at our Experience Center, or you can view some of our past documented projects we have done in ${location}, here to get a closer look at the craftsmanship and designs we offer.`,
    displayOrder: 8
  },
  {
    question: `Can I meet my temple designer in ${location}?`,
    answer: `Yes, you can book our site visit service for meeting your designer in person. Or you can also virtually connect with our team. We have an expert team of 2D designers who ensure that your dream temple is perfectly designed as per your size and requirements. We also have a team of expert 3D designers who can help you visualise your dream temple and bring it into reality.`,
    displayOrder: 9
  },
  {
    question: `Can I meet my temple consultant in ${location}?`,
    answer: `Yes, you can book our site visit service for a one-on-one in person consultation with expert consultants in ${location}. They will help you understand the process of building your dream temple and how, we at Tilak Stone Arts India ensure a smooth process of executing your dream temple and conduct a recce of your site.`,
    displayOrder: 10
  },
  {
    question: `Can I have a meeting for my Temple at home in ${location}?`,
    answer: '',
    displayOrder: 11
  },
  {
    question: `How can I select materials for my Temple design in ${location}?`,
    answer: '',
    displayOrder: 12
  },
  {
    question: `How will my site be measured for my Home Temple in ${location}?`,
    answer: `We have a team of site engineers who will visit your site and take proper measurements of the space where your temple needs to be installed. These measurements will further ensure proper execution of your dream temple.`,
    displayOrder: 13
  },
  {
    question: `Where have you worked in ${location}?`,
    answer: `You are invited to explore our work at our Experience Center, or you can view some of our past documented projects here to get a closer look at the craftsmanship and designs we offer.`,
    displayOrder: 14
  },
  {
    question: `What will be the completion timeline for my pooja room project in ${location}?`,
    answer: `Our exclusive pooja room takes around 12-14 weeks to complete.`,
    displayOrder: 15
  }
];

// Indian locations
const indianLocations = ['Mumbai', 'Delhi', 'Ahmedabad', 'Kolkata', 'Pune', 'Surat', 'Jaipur', 'Bengaluru', 'Hyderabad'];

const seedFAQs = async () => {
  try {
    // Connect to database
    await connectDB(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing FAQs
    await FAQ.deleteMany({});
    console.log('🗑️  Cleared existing FAQs');

    // Seed page-specific FAQs
    for (const [pageKey, faqs] of Object.entries(allFAQsData)) {
      for (const faq of faqs) {
        await FAQ.create({
          pageKey,
          location: null,
          question: faq.question,
          answer: faq.answer,
          displayOrder: faq.displayOrder,
          isActive: true
        });
      }
      console.log(`✅ Seeded ${faqs.length} FAQs for ${pageKey}`);
    }

    // Seed location-specific FAQs
    for (const location of indianLocations) {
      const locationFAQs = getLocationFAQs(location);
      for (const faq of locationFAQs) {
        // Only insert FAQs with answers
        if (faq.answer && faq.answer.trim() !== '') {
          await FAQ.create({
            pageKey: 'location',
            location: location,
            question: faq.question,
            answer: faq.answer,
            displayOrder: faq.displayOrder,
            isActive: true
          });
        }
      }
      const faqsWithAnswers = locationFAQs.filter(f => f.answer && f.answer.trim() !== '');
      console.log(`✅ Seeded ${faqsWithAnswers.length} FAQs for location: ${location}`);
    }

    console.log('🎉 FAQ seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error);
    process.exit(1);
  }
};

// Run the seed function
seedFAQs();

