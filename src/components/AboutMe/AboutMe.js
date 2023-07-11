import studentPhoto from '../../images/student-photo.svg'

function AboutMe() {
  return(
    <section className="student">
      <div className='section-title'>
        <h2 className='section-title__content'>Студент</h2>
      </div>
      <div className="student__content">
        <article className="student__article">
          <h3 className="student__article-title">Евдоким</h3>
          <p className="student__article-subtitle">Фронтенд-разработчик, 18 лет</p>
          <p className="student__article-content">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <p className="student__article-github">Github</p>
        </article>
        <img className="student__photo" alt="Мое фото" src={studentPhoto}/>
      </div>
    </section>
  )
}

export default AboutMe;
