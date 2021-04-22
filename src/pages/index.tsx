export default function Home(props) {
  // SPA - Single Page Application
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  // }, [])
  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}

// SSR - Server Side Rendering
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()
//   return {
//     props: {
//       episodes: data,
//     },
//   }
// }

// SSG - Server Static Generation
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()
  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}