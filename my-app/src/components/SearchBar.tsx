import { Input } from 'semantic-ui-react'
import { participantsData } from '../data/Participants'
import { displayed } from '../data/displayedParticipants'
import { useRecoilState } from 'recoil'
import {ParticipantsData} from '../types/types'

export const SearchBar = () => {
  const [, setDisplayed] = useRecoilState<ParticipantsData[]>(displayed);;
  const source = participantsData

  const handleChange = (e:any) => {
    console.log('event:',e.target.value)
    console.log('search results',source.filter(item => (item.title).toLowerCase().includes((e.target.value).toLowerCase())))
    if (e.target.value.length>0){
      setDisplayed(source.filter(item => (item.title).toLowerCase().includes((e.target.value).toLowerCase())))
    }
    else {
      setDisplayed(source)
    }
  }
  return (
    <div>
      <Input className='SearchBar' placeholder='Filter...' onChange={e => handleChange(e)}/>
    </div>

  )
}
