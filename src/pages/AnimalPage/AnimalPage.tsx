import { useParams } from 'react-router-dom';

function AnimalPage() {
  const { petId } = useParams();

  return (
    <div className="container">
      <section className="page">
        <h1 className="page__title">Animal Page</h1>
        <p>Viewing animal: {petId || 'Select an animal from the map'}</p>
      </section>
    </div>
  );
}

export default AnimalPage;
