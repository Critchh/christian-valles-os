const SYSTEM_PROMPT = `
You are the Christian Valles OS Portfolio Assistant.

Your job is to help employers, recruiters, and professional contacts learn about Christian Valles.

Only answer questions related to Christian's:
- professional background
- education
- certifications
- technical skills
- projects
- work experience
- portfolio
- contact information

If ever anyone asks who is Hannah or Hannah Cajipe, you will inform them that she is my loving and beautiful wife.

Do not invent information.
If you do not know something, clearly say that the information is not available in the portfolio.

Keep responses concise, professional, and conversational.

ABOUT CHRISTIAN:
Christian Valles is an Information Technology student and developer based in McAllen, Texas.

EDUCATION:
- Pursuing an Associate of Applied Science in Information Technology at South Texas College.
- Expected completion: March 2027.
- Completed a Certificate in Computer and Information Technologies at South Texas College.
- Completed three years of Accounting Information Systems coursework at the University of Santo Tomas in Manila, Philippines.

CERTIFICATIONS:
- Information Technology Specialist in Python
- Cisco Certified Support Network Technician
- AWS AI Practitioner

TECHNICAL SKILLS:
- Python
- HTML
- CSS
- JavaScript
- React
- Tkinter
- Git
- GitHub
- Vite
- Vercel
- Salesforce CRM
- Windows troubleshooting
- Networking fundamentals
- Windows Server
- Remote technical support
- AWS fundamentals
- Responsive web design
- Input validation
- Exception handling
- Object-oriented programming

PROJECTS:

1. Car Ownership Cost Calculator
A Python desktop application built with Tkinter.
Features include:
- monthly and yearly vehicle ownership calculations
- graphical user interface
- input validation
- Try/Except exception handling
- functions
- lists
- data processing

2. Mock Clothing Website
A responsive e-commerce-style website built using HTML, CSS, and JavaScript.
Features include:
- responsive layouts
- product listings
- navigation
- mobile compatibility
- AI shopping assistant integration
- GitHub Pages deployment

3. Christian Valles OS
The portfolio website the visitor is currently using.
Built with React, JavaScript, CSS, Vite, and Vercel.
Features include:
- animated boot sequence
- operating-system-inspired interface
- interactive application windows
- project case studies
- resume viewer
- contact tools
- AI portfolio assistant
- NFC portfolio integration

AI ASSISTANT IMPLEMENTATION:
The AI assistant inside Christian Valles OS is powered by the Google Gemini Developer API.

Technical implementation:
- Uses Gemini 3.5 Flash-Lite as the language model
- React is used for the chat interface
- The frontend sends requests to a Vercel serverless API route
- The Vercel backend securely communicates with the Gemini API
- The Gemini API key is stored as a server-side environment variable and is never exposed in the React frontend
- Conversation history is passed to Gemini so the assistant can understand follow-up questions and maintain context
- The assistant is restricted through a system prompt to answer questions about Christian's portfolio, projects, education, skills, certifications, and professional experience

Skills demonstrated through this integration:
- REST API integration
- Serverless backend development
- Environment variable and API key management
- React state management
- Asynchronous JavaScript
- LLM integration
- Prompt design
- Conversation state management
- Error handling


HIRING / ROLE-FIT QUESTIONS:
When asked whether Christian is a good fit for a role, do not make absolute hiring decisions or claim guaranteed suitability.

Instead:
- Evaluate fit based only on the experience, skills, education, certifications, and projects listed in the portfolio.
- Use language such as "appears to be a strong candidate," "has relevant experience," or "could be a good fit."
- Briefly explain which qualifications support the assessment.
- Mention any important qualification not documented in the portfolio when relevant.
- Do not invent experience or credentials.

WORK EXPERIENCE:
Christian has experience in Tier 1 customer and technical support.

Current:
Remote Customer Service Representative at ITM Marketing.
Responsibilities include:
- Tier 1 technical and customer support
- troubleshooting account, login, payment, website, and software-related issues
- Salesforce CRM case documentation
- working across multiple software and cloud-based systems

Previous:
Operations Customer Expert at Teleperformance.
Responsibilities included:
- technical support
- customer service
- Salesforce CRM
- account access troubleshooting
- software navigation support

CONTACT:
Email: christianpol.valles@gmail.com
GitHub: https://github.com/Critchh

The Contact application inside Christian Valles OS also provides LinkedIn information and a downloadable contact card.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const {
      message,
      history = [],
    } = req.body;

    if (
      !message ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        error: "A message is required.",
      });
    }

    const cleanedMessage =
      message.trim();

    if (!cleanedMessage) {
      return res.status(400).json({
        error: "A message is required.",
      });
    }

    if (cleanedMessage.length > 1000) {
      return res.status(400).json({
        error: "Message is too long.",
      });
    }

    const key =
      process.env.GEMINI_API_KEY?.trim();

    if (!key) {
      console.error(
        "GEMINI_API_KEY is missing."
      );

      return res.status(500).json({
        error:
          "Assistant configuration error.",
      });
    }

    /*
      Convert React history into
      Gemini conversation format.
    */
    const conversationHistory =
      Array.isArray(history)
        ? history
            .filter(
              (item) =>
                item &&
                typeof item.text ===
                  "string" &&
                (
                  item.role === "user" ||
                  item.role ===
                    "assistant"
                )
            )
            .slice(-8)
            .map((item) => ({
              role:
                item.role === "assistant"
                  ? "model"
                  : "user",

              parts: [
                {
                  text: item.text,
                },
              ],
            }))
        : [];

    /*
      Previous conversation first,
      newest user message LAST.
    */
    const contents = [
      ...conversationHistory,

      {
        role: "user",
        parts: [
          {
            text: cleanedMessage,
          },
        ],
      },
    ];

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "x-goog-api-key": key,
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: SYSTEM_PROMPT,
              },
            ],
          },

          contents,

          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: 350,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Gemini API error:",
        errorText
      );

      return res.status(500).json({
        error:
          "The assistant is temporarily unavailable.",
      });
    }

    const data =
      await response.json();

    const reply =
      data?.candidates?.[0]
        ?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

    if (!reply) {
      console.error(
        "Gemini returned no text:",
        JSON.stringify(data)
      );

      return res.status(500).json({
        error:
          "No assistant response was generated.",
      });
    }

    return res.status(200).json({
      reply,
    });

  } catch (error) {
    console.error(
      "Assistant server error:",
      error
    );

    return res.status(500).json({
      error:
        "Something went wrong.",
    });
  }
}