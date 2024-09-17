"use client";
import React, { useState } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import { ChevronDown, Search } from 'lucide-react';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    { question: 'How do I upload a document?', answer: 'Navigate to the Document Upload page, click on the upload area, select your file, and click the Upload button.' },
    { question: 'What file formats are supported?', answer: 'We support PDF, JPEG, and PNG formats for document uploads.' },
    { question: 'How long does verification take?', answer: 'Verification typically takes 1-2 business days, depending on the complexity of the document.' },
    // Add more FAQs as needed
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <Typography variant="h4" className="mb-4">Help Center</Typography>
      <div className="mb-6">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search className="mr-2 text-gray-400" />,
          }}
        />
      </div>
      {filteredFaqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default HelpCenter;