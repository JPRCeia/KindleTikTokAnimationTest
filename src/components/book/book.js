import React, { useState, useEffect, useRef } from "react";
import './book.css'; // Import the CSS file

const loadBook = async () => {
  try {
    const response = await fetch('./pub.txt'); // Adjust the path as needed
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const bookText = await response.text();
    return bookText;
  } catch (error) {
    console.error('Failed to load book:', error);
    return '';
  }
};

const BookReader = () => {
  const [bookContent, setBookContent] = useState([]);
  const pageRefs = useRef([]);

  useEffect(() => {
    const loadContent = async () => {
      const text = await loadBook();
      if (text) {
        const parsedContent = parseBook(text);
        setBookContent(parsedContent);
      } else {
        console.error('No content loaded');
      }
    };

    loadContent();
  }, []);

  const parseBook = (text) => {
    const pages = text.split('<TEXT>'); // Split by 'TEXT'
    let parsedPages = [];
    let imageIndex = 0;
  
    pages.forEach((pageText, index) => {
      const sections = pageText.split('<GIF-‘layout_epub.gif’>');
      sections.forEach((section, sectionIndex) => {
        if (sectionIndex % 2 === 1) {
          parsedPages.push({ title: `Image Page ${parsedPages.length + 1}`, sections: [{ type: 'image', src: `./image${imageIndex + 1}.jpg` }] });
          imageIndex++; // Replace with actual image path logic
        } else {
          parsedPages.push({ title: `Page ${parsedPages.length + 1}`, sections: [{ type: 'text', text: section.trim() }] });
        }
      });
    });
  
    return parsedPages;
  };

  return (
    <section className="book-section">
      {bookContent && bookContent.length > 0 ? (
        bookContent.map((page, pageIndex) => (
          <section
            key={pageIndex}
            className="page-section"
            ref={(el) => (pageRefs.current[pageIndex] = el)}
          >
            <h2 className="page-title">{page.title}</h2>
            {page.sections.map((section, sectionIndex) => (
              section.type === 'text' ? (
                <p key={sectionIndex}>{section.text}</p>
              ) : (
                <img key={sectionIndex} src={section.src} alt={`Image ${sectionIndex}`} />
              )
            ))}
          </section>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default BookReader;