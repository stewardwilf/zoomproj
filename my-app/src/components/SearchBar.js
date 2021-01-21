import React from 'react'
import { Input } from 'semantic-ui-react'
import { participantsData } from '../data/Participants'
import { displayed } from '../data/displayedParticipants'
import { useRecoilState } from 'recoil'

const source = participantsData

export const SearchBar = () => {
  const [, setDisplayed] = useRecoilState(displayed);;

  const handleChange = (e) => {
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
