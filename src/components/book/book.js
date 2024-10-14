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
    handleResize(); // Adjust on initial load
    window.addEventListener('resize', handleResize); // Adjust on window resize

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const parseBook = (text) => {
    const pages = text.split('<TEXT>'); // Split by 'TEXT'
    let parsedPages = [];
    let imageIndex = 0;
  
    pages.forEach((pageText, index) => {
      const sections = pageText.split('<GIF-‘layout_epub.gif’>');
      sections.forEach((section, sectionIndex) => {
        if (sectionIndex % 2 === 1) {
          parsedPages.push({ title: `Image Page ${parsedPages.length + 1}`, sections: [{ type: 'image', src: `./image${imageIndex + 1}.gif` }] });
          imageIndex++; // Replace with actual image path logic
        } else {
          const textSections = splitTextIntoSections(section.trim());
          textSections.forEach((textSection, textSectionIndex) => {
            parsedPages.push({ title: `Page ${parsedPages.length + 1}`, sections: [{ type: 'text', text: textSection }] });
          });
        }
      });
    });
  
    return parsedPages;
  };

  const splitTextIntoSections = (text) => {
    const maxHeight = window.innerHeight * 0.8; // Adjust based on available space
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.height = 'auto';
    tempDiv.style.width = '80vw'; // Adjust based on available space
    tempDiv.style.fontSize = 'var(--dynamic-font-size)';
    document.body.appendChild(tempDiv);

    const sections = [];
    let currentText = '';
    text.split(' ').forEach(word => {
      tempDiv.innerText = currentText + ' ' + word;
      if (tempDiv.offsetHeight > maxHeight) {
        sections.push(currentText);
        currentText = word;
      } else {
        currentText += ' ' + word;
      }
    });
    sections.push(currentText);
    document.body.removeChild(tempDiv);
    return sections;
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const fontSize = width < 480 ? '3em' : width < 768 ? '2.5em' : '2em';
    const imgMaxHeight = height * 0.8;

    document.documentElement.style.setProperty('--dynamic-font-size', fontSize);
    document.documentElement.style.setProperty('--dynamic-img-max-height', `${imgMaxHeight}px`);
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