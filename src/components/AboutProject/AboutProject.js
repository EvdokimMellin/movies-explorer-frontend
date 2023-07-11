import projectTimeline from '../../images/project-timeline.svg';

function AboutProject() {
  return(
    <section className="about">
      <div className='section-title'>
        <h2 className='section-title__content'>О проекте</h2>
      </div>
      <div className='about__articles'>
        <article className='about__article'>
          <h3 className='about__article-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about__article-content'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className='about__article'>
          <h3 className='about__article-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__article-content'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <img className='about__timeline' alt="1 неделя на backend и 4 недели на frontend" src={projectTimeline} />
    </section>
  )
}

export default AboutProject;
