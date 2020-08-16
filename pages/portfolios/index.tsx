import axios from 'axios';
import PortfolioCard from '../../components/portfolios/PortfolioCard';
import Link from 'next/link';
import { IPortfolio } from '../../Types';
import { useState } from 'react';

const fetchPortfolios = () => {
  const query = `
  query Portfolios {
    portfolios {
      _id,
      title,
      company,
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }`;
  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolios);
};

const graphCreatePortfolio = () => {
  const query = `
  mutation CreatePortfolios {
    createPortfolio(input: {
      title: "New Job"
      company: "New Company"
      companyWebsite: "New Website"
      location: "New Location"
      jobTitle: "New Job Title"
      description: "New Desc"
      startDate: "12/12/2012"
      endDate: "14/11/2013"
    }){
      _id,
      title,
      company,
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }`;

  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.createPortfolio);
};

const graphUpdatePortfolio = (id: string) => {
  const query = `
  mutation UpdatePortfolios {
    updatePortfolio(id: "${id}", input: {
      title: "Update Job"
      company: "Update Company"
      companyWebsite: "Update Website"
      location: "Update Location"
      jobTitle: "Update Job Title"
      description: "Update Desc"
      startDate: "12/12/2012 Update"
      endDate: "14/11/2013 Update"
    }){
      _id,
      title,
      company,
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }`;

  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.updatePortfolio);
};

const graphDeletePortfolio = (id: string) => {
  const query = `
    mutation DeletePortfolio {
      deletePortfolio(id: "${id}")
    }
  `

  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.deletePortfolio);
}

const Portfolios = ({ portfolios }: { portfolios: IPortfolio[] }) => {
  const [portfoliosState, setPortfoliosState] = useState(portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortfolio();
    const newPortfolios = [...portfoliosState, newPortfolio];
    setPortfoliosState(newPortfolios);
  };

  const updatePortfolio = async (id: string) => {
    const updatePortfolio = await graphUpdatePortfolio(id);
    const index = portfoliosState.findIndex((p) => p._id === id);
    const newPortfolios = portfoliosState.slice();
    newPortfolios[index] = updatePortfolio;
    setPortfoliosState(newPortfolios);
  };

  const deletePortfolio = async (id: string) => {
    const deleteId = await graphDeletePortfolio(id);
    const index = portfoliosState.findIndex((p) => p._id === deleteId);
    const newPortfolios = portfoliosState.slice();
    newPortfolios.splice(index,1);
    setPortfoliosState(newPortfolios);
  };

  return (
    <>
      <section className='section-title'>
        <div className='px-2'>
          <div className='pt-5 pb-4'>
            <h1>Portfolios</h1>
          </div>
        </div>
        <button onClick={createPortfolio} className='btn btn-primary'>
          Create Portfolio
        </button>
      </section>
      <section className='pb-5'>
        <div className='row'>
          {portfoliosState.map((portfolio: IPortfolio) => (
            <div key={portfolio._id} className='col-md-4'>
              <Link href='/portfolios/[id]' as={`/portfolios/${portfolio._id}`}>
                <a className='card-link'>
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
              <button
                className='btn btn-warning'
                onClick={() => updatePortfolio(portfolio._id)}
              >
                Update Portfolio
              </button>
              <button
                className='btn btn-danger'
                onClick={() => deletePortfolio(portfolio._id)}
              >
                Delete Portfolio
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return { portfolios };
};

export default Portfolios;
