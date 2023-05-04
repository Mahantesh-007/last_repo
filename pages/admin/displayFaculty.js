import React, { useEffect } from 'react';
import Register from '@/models/adminSignUp';
import connectDB from '@/middleware/db';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function displayFaculty({facultyMembers}) {

  const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token || token.isAdmin === true) {
        router.push('/admin/Login');
      }
    }, [router]);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 1,
      },
    }));
    const handleApprove = async (id) => {
        try {
          console.log(id);
          const response = await fetch(`/api/faculty/faculty?_id=${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }

      const handleDelete = async (id) => {
        try {
          console.log(id);
          const response = await fetch(`/api/faculty/faculty?_id=${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
          });
          
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }

      
      
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align = "center">Name</StyledTableCell>
          <StyledTableCell align = "center">Email</StyledTableCell>
          <StyledTableCell align="center">Actions</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {facultyMembers && Object.keys(facultyMembers).map((item) => (
          <StyledTableRow key={facultyMembers[item]._id} sx={{ "&:hover": { backgroundColor: "" } }} >
            {facultyMembers[item].department !== null && (
              <>
                <TableCell align = "center">
                  {facultyMembers[item].username}
                </TableCell>
                <TableCell align = "center">
                  {facultyMembers[item].email}
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={(e) => handleApprove(facultyMembers[item]._id)}>
                    Approve
                  </Button>
                  <Button  variant = "outlined" color = "error" onClick={(e) => handleDelete(facultyMembers[item]._id)}>
                    Delete
                  </Button>
                </TableCell>
              </>
            )}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
}
export default displayFaculty


export async function getServerSideProps(context) {
    try {
      await connectDB();
      const facultyMembers = await Register.find({});
      
      const filteredFacultyMembers = facultyMembers.map((member) => ({
        _id: member.id, 
        username: member.username,
        email: member.email,
        department: member.department ? member.department : null,
      }));
  
      return {
        props: {
          facultyMembers: filteredFacultyMembers
        }
      };
    } catch (error) {
      console.error(error.message);
      return {
        props: {
          facultyMembers: []
        }
      };
    }
  }
