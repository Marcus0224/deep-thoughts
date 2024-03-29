import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';

import ThoughtList from '../components/ThoughtList';

import { ADD_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm'

const Profile = () => {
const [addFriend] = useMutation(ADD_FRIEND);

const handleClick = async () => {
  try {
    await addFriend({
      variables: { id: user._id }
    });
  } catch (e) {
    console.error(e);
  }
};
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  // navigate to personal profile page if username is the logged in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === useParams) {
    return <Navigate to='/profile' />;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }
  
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {useParams ? `{user.username}'s` : 'your'} profile.
        </h2>
        {useParams && (
        <button className='btn ml auto' onClick={handleClick}>
          add Friend
        </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`} />
        </div>
        
        <div className='col-12 col-lg-3 mb-3'>
          <FriendList
          username={user.username}
          friendCount={user.friendCount}
          friends={user.friends}
          />
        </div>
      </div>
      <div className='mb-3'>{!useParams && <ThoughtForm />}</div>
    </div>
  );
};

export default Profile;
