import { useState, useEffect } from 'react'
import titleArray from '../Data/db.jsx'
const initialFormData =
{
    title: '',
    platforms: '',
    author: '',
    published: false
}


export default function AppMain() {

    const [titles, setTitles] = useState(titleArray)
    const [newTitles, setNewTitles] = useState('')
    const [formData, setFormData] = useState(initialFormData)


    function handleFormSubmit(e) {
        e.preventDefault()
        console.log('Form sent', formData);
        const newItem = {
            ...formData
        }
        console.log(e.target.name, e.target.value, e.target.checked);
        setFormData(initialFormData);

    }



    function handleRemoveTitle(e) {
        const titleToRemove = Number(e.target.getAttribute('data-index'))
        const newTitles = titles.filter((title, index) => titleToRemove != index)

        setTitles(newTitles)
    }

    function handleChangeTitle(e) {
        const titleToChange = Number(e.target.getAttribute('data-index'));
        const newModifiedTitle = prompt("Modifica il titolo", titles[titleToChange])
        const updatedTitles = titles.map((title, index) => {
            if (index === titleToChange) {

                return newModifiedTitle
            }
            return title
        });
        setTitles(updatedTitles)
    }


    function handleFormField(e) {
        //console.log(e.target);


        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }









    return (
        <main>


            <div className="container">
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group my-5">
                        <input type="text" name='title' className="form-control" placeholder="Inserisci un titolo" aria-label="Inserisci un titolo " aria-describedby="button-addon2" value={formData.title} onChange={handleFormField} />
                        <input type="text" name='platforms' className="form-control" placeholder="Inserisci le piattaforme" aria-label="Inserisci le piattaforme " aria-describedby="button-addon2" value={formData.platforms} onChange={handleFormField} />
                    </div>
                    <div className="input-group my-5">
                        <input type="text" className="form-control" placeholder="Inserisci l'autore" aria-label="Inserisci l'autore " aria-describedby="button-addon2" name='author' value={formData.author} onChange={handleFormField} />
                        <div className="form-check ms-3">
                            <input className="form-check-input" type="checkbox" name='published' value={formData.published} onChange={handleFormField} id="" />
                            <label className="form-check-label"> pubblicato </label>
                        </div>


                    </div>
                    <button className="btn btn-primary btn-lg mb-3 " type="submit">
                        <i className="bi bi-plus"></i> Add
                    </button>
                </form>






                <h2 >Titoli Di Oggi</h2>
                <ul className="list-group mt-4  ">
                    {titles.map((title, index) => <li className="list-group-item d-flex justify-content-between mx-4" key={index}>{title.title}
                        <div>
                            <button className='btn btn-warning me-2' onClick={handleChangeTitle} data-index={index}>Cambia</button>
                            <button className='btn btn-danger' onClick={handleRemoveTitle} data-index={index}>Rimuovi</button>
                        </div>


                    </li>)}


                </ul>
            </div>

        </main>
    )
}