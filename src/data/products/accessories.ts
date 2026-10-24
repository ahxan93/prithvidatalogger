// /products/accessories | Product
import type { ProductContent } from "../product-content.ts";

const content: ProductContent = {
  metaTitle: "Data Logger with Alarm: Hooter & Door Sensor",
  metaDescription:
    "Add a Wi-Fi hooter with up to 4 door sensors to get a data logger with alarm, plus a charging dock for spare batteries. Get a solution.",
  intro:
    "Add the external hooter to your Prithvi setup and you have a data logger with alarm that sounds on site, with up to 4 door sensors. A charging dock keeps a charged spare battery ready. Our team confirms accessory compatibility for your model when we prepare your quote.",
  measures: "Alarm, door sensing and battery charging",
  rangeSummary: "Up to 4 door sensors per hooter",
  keyFeatures: [
    "Wi-Fi hooter with instant audible alarms on any excursion",
    "Supports up to 4 door sensors, with an alarm if a door stays open beyond the set time",
    "One hooter can serve multiple loggers",
    "Logs door open/close and excursion events",
    "Charging dock keeps a charged spare battery ready, minimising downtime",
  ],
  faqs: [
    {
      question: "How many door sensors can one hooter support?",
      answer: "Up to 4 door sensors, with an alarm if a door stays open beyond the time you set.",
    },
    {
      question: "Can one hooter work with several loggers?",
      answer: "Yes. One hooter can serve multiple loggers.",
    },
    {
      question: "How is the hooter powered?",
      answer: "It uses a 12 V DC adapter with a 12 V external hooter. The cable length is configurable.",
    },
    {
      question: "How do I get a data logger with alarm that sounds on site?",
      answer:
        "Add the external hooter. It gives an audible alarm on any excursion, and an alarm if a door stays open beyond the time you set. Our team confirms it works with your logger model when we prepare your quote.",
      link: { href: "/industries/hospitals-blood-banks", text: "See hospital and blood bank monitoring" },
    },
    {
      question: "What do the accessories cost?",
      answer: "Share your requirement and we will send a clear quote.",
    },
  ],
};

export default content;
