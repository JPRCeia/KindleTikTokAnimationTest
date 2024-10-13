import React, { useState, useEffect, useRef } from "react";
import './book.css'; // Import the CSS file

const loadBook = async () => {
  const bookText = `
    CHAPTER 
    PAGE_BREAK
Numa manhã, ao despertar de sonhos inquietantes, Gregório Samsa deu por
    si na cama transformado num gigantesco inseto. Estava deitado sobre o dorso, tão
    duro que parecia revestido de metal, e, ao levantar um pouco a cabeça, divisou o
    arredondado ventre castanho dividido em duros segmentos arqueados, sobre o qual
    a colcha dificilmente mantinha a posição e estava a ponto de escorregar.
    Comparadas com o resto do corpo, as inúmeras pernas, que eram miseravelmente
    finas, agitavam-se desesperadamente diante de seus olhos. 
PAGE_BREAK
Mas era
    impossível, estava habituado a dormir para o lado direito e, na presente situação,
    não podia virar-se. Por mais que se esforçasse por inclinar o corpo para a direita,
    tornava sempre a rebolar, ficando de costas. Tentou, pelo menos, cem vezes,
    fechando os olhos, para evitar ver as pernas a debaterem-se, e só desistiu quando
    omeçou a sentir no flanco uma ligeira dor entorpecida que nunca antes
    experimentara. Oh, meu Deus, pensou, que trabalho tão cansativo escolhi! Viajar,
    dia sim, dia não.
PAGE_BREAK
Mas era
    impossível, estava habituado a dormir para o lado direito e, na presente situação,
    não podia virar-se. Por mais que se esforçasse por inclinar o corpo para a direita,
    tornava sempre a rebolar, ficando de costas. Tentou, pelo menos, cem vezes,
    fechando os olhos, para evitar ver as pernas a debaterem-se, e só desistiu quando
    omeçou a sentir no flanco uma ligeira dor entorpecida que nunca antes
    experimentara. Oh, meu Deus, pensou, que trabalho tão cansativo escolhi! Viajar,
    dia sim, dia não.

    CHAPTER 
    PAGE_BREAK
Mas era
    mpossível, estava habituado a dormir para o lado direito e, na presente situação,
    não podia virar-se. Por mais que se esforçasse por inclinar o corpo para a direita,
    tornava sempre a rebolar, ficando de costas. Tentou, pelo menos, cem vezes,
    fechando os olhos, para evitar ver as pernas a debaterem-se, e só desistiu quando
    omeçou a sentir no flanco uma ligeira dor entorpecida que nunca antes
    xperimentara. Oh, meu Deus, pensou, que trabalho tão cansativo escolhi! Viajar,
    dia sim, dia não.
PAGE_BREAK
Mas era
    impossível, estava habituado a dormir para o lado direito e, na presente situação,
    não podia virar-se. Por mais que se esforçasse por inclinar o corpo para a direita,
    ornava sempre a rebolar, ficando de costas. Tentou, pelo menos, cem vezes,
    fechando os olhos, para evitar ver as pernas a debaterem-se, e só desistiu quando
    omeçou a sentir no flanco uma ligeira dor entorpecida que nunca antes
    xperimentara. Oh, meu Deus, pensou, que trabalho tão cansativo escolhi! Viajar,
    dia sim, dia não.
    
  `;
  return bookText;
};
const BookReader = () => {
  const [bookContent, setBookContent] = useState([]);
  const chapterRefs = useRef([]);

  useEffect(() => {
    const loadContent = async () => {
      const text = await loadBook();
      const parsedContent = parseBook(text);
      setBookContent(parsedContent);
    };

    loadContent();
  }, []);

  const parseBook = (text) => {
    const chapters = text.split('CHAPTER').slice(1); // Split by 'Chapter' and remove the first empty element
    return chapters.map((chapterText, index) => {
      const [title, ...pages] = chapterText.split('PAGE_BREAK'); // Assuming pages are separated by double newlines
      return {
        title: `Chapter ${index + 1}: ${title.trim()}`,
        pages: pages.map(pageText => ({ text: pageText.trim() }))
      };
    });
  };

  return (
    <section className="book-section">
      {bookContent.map((chapter, chapterIndex) => (
        <section
          key={chapterIndex}
          className="chapter-section"
          ref={(el) => (chapterRefs.current[chapterIndex] = el)}
        >
          <h2 className="chapter-title">{chapter.title}</h2>
          {chapter.pages.map((page, pageIndex) => (
            <section key={pageIndex} className="page-section">
              <p>{page.text}</p>
            </section>
          ))}
        </section>
      ))}
    </section>
  );
};

export default BookReader;