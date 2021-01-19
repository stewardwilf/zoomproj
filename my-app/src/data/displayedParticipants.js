import {atom} from 'recoil'
import { participantsData } from '../data/Participants'

export const displayed = atom({
    key: "displayed",
    default: participantsData
  });