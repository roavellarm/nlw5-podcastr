import { GetServerSideProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import api from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

type Episode = {
  id: string
  title: string
  description: string
  members: string
  thumbnail: string
  url: string
  duration: number
  durationAsString: string
  publishedAt: string
  // ...
}

type HomeProps = {
  episodes: Episode[]
}

export default function Home(props: HomeProps) {
  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}

export const getStaticProps: GetServerSideProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBr }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
    }
  })

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
