import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, ListItemText, Typography, Paper, Button, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; 
import Layout from '../Layout/Layout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import assi from "../images/assi.png";

const AssignmentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      setPosts(parsedPosts);
      setFilteredPosts(parsedPosts);
    }
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <>
      <Layout />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              direction="column"
              style={{
             
                marginTop: 0,
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '0 10px', // Added padding for responsiveness
              }}
            >
              {/* Button to View your Work */}
              <Box
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                <Link>
                  <Button className="fw-semibold">
                    <AccountBoxIcon className="mx-1 fs-5" /> View your work
                  </Button>
                </Link>
              </Box>

              {/* Search Input with Down Arrow Icon inside */}
              <Box
                style={{
                  width: '100%',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                <input
                  type="text"
                  placeholder="All Topics"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{
                    width: '100%',
                    maxWidth: '500px', // Limit the max width of the input
                    padding: '10px 40px 10px 10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                />
                {/* Down Arrow Icon inside input field */}
                <ArrowDropDownIcon
                  style={{
                    position: 'absolute',
                    right: '31%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                />
              </Box>

             

              {/* Displaying the list of posts */}
              <Box sx={{ 
  marginLeft: { xs: '0px', sm: '0px', md: '220px' } }}
                style={{
                  width: '100%',
                  maxWidth: '900px',
                  marginTop: 20,
                }}
              >
                <List 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {filteredPosts.length === 0 && searchTerm ? (
                    <Typography variant="body1" color="textSecondary" align="center">
                      No posts found.
                    </Typography>
                  ) : (
                    filteredPosts.map((post, index) => (
                      <ListItem 
                        className="py-3"
                        key={index}
                        divider
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                      >
                        <Typography>
                          <img
                            className="mx-3"
                            style={{ width: '35px' }}
                            src={assi}
                            alt=""
                          />
                          Ijaz Liaqat posted a new assignment: {post.title.length > 25 ? `${post.title.slice(0, 25)}...` : post.title}
                        </Typography>
                        <Typography className="text-secondary" style={{ fontSize: '12px' }}>
                          {post.date} <MoreVertIcon className="mx-2" />
                        </Typography>
                      </ListItem>
                    ))
                  )}
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AssignmentList;
