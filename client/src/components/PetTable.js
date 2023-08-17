import PetDetails from './PetDetails'
import ConfirmPetDelete from './ConfirmPetDelete'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PetTable = (props)=> {

    const navigate = useNavigate();

    useEffect(props.loadPets, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                
                {props.pets && props.pets.length > 0 && 
                props.pets.map(pet => (
                    
                    <tr key={pet.petId}>
                        <td>{pet.name}</td>
                        <td>{pet.petType}</td>
                        <td><Link to={`/petdetails/${pet.petId}`}>Details</Link></td>
                        {/* <td><button onClick={navigate(`/petdetails/${pet.petId}`)}>Details</button></td> */}
                        {/* <td><button></button>{<PetDetails />}</td>
                        <td>{<ConfirmPetDelete />}</td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PetTable;