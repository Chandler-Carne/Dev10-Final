import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

const SitterTable = ({ sitters }) => {

    const auth = useContext(AuthContext);

    return (
        <Container>
            <h3 className="my-5">Sitters Near You</h3>
            {sitters && sitters.length ? (
                <>
                    <div className="d-flex justify-content-between ml-5"> 
                        {sitters.slice(0, 3).map(sitter => (
                            <div key={sitter.appUserId} className="card" style={{width: "18rem"}}>
                                {/* Need to have a pfp URL, prob in contact_info table */}
                                {/* <img src={sitter.pfpUrl} className="card-img-top" alt="" /> */}
                                <div className="card-body">
                                    <h5 className="card-title">{sitter.username}</h5>
                                    <p className="card-text">{parseFloat(sitter.distanceInKm).toFixed(2)} km away</p>
                                    <p>Rate: {sitter.rate}</p>
                                    <p>
                                        <Link className="btn btn-info" to={{
                                            pathname: `/users/sitter/${sitter.username}`,
                                            state: { sitterFromTable: sitter }
                                        }}>View Details</Link>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>Profile</th> */}
                                <th>Username</th>
                                <th>Rate</th>
                                <th>Distance</th>
                                <th>Details</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sitters.slice(3).map(sitter => (
                                <tr key={sitter.appUserId}>
                                    <td>{sitter.username}</td>
                                    <td>${sitter.rate}</td>
                                    <td>{parseFloat(sitter.distanceInKm).toFixed(2)} km</td>
                                    <td>
                                        <Link className="btn btn-info" to={{
                                            pathname: `/users/sitter/${sitter.username}`,
                                            state: { sitterFromTable: sitter }
                                        }}>View Details</Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            ) : (
                <p>Please Enter Your Address to Find Nearby Sitters</p>
            )}
        </Container>
    )
}

export default SitterTable;
