'use client' // This directive ensures that the component is rendered on the client side.
import React, { useState } from 'react'
import { BsFillEmojiAngryFill } from "react-icons/bs";
import { ImHappy2 } from "react-icons/im";
import { SlLike } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { Button } from '@nextui-org/button';

const Reaction = () => {
  // State to manage the count of different reactions
  const [postReactions, setPostReactions] = useState({
    angry: 5,
    wow: 1,
    like: 20,
    love: 3
  });

  // State to control the visibility of the reaction selection div
  const [isReactionDivOpen, setIsReactionDivOpen] = useState(false);

  // State to keep track of the currently selected reaction type
  const [reactionType, setReactionType] = useState(null);

  // Function to handle reaction change
  const handleReactionChange = (newReaction) => {
    // Create a copy of the current reactions
    const reactionsBckUp = { ...postReactions };

    // If the same reaction type is clicked, decrement its count and reset the reaction type
    if (newReaction === reactionType) {
      reactionsBckUp[newReaction]--;
      setReactionType(null);
    } else {
      // Otherwise, increment the new reaction type's count and set it as the current reaction type
      reactionsBckUp[newReaction]++;
      setReactionType(newReaction);
    }
    // Update the state with the new reactions
    setPostReactions(reactionsBckUp);
  };

  // Function to generate the selected reaction component
  const generateSelectedReaction = () => {
    if (reactionType === 'angry') {
      return <BsFillEmojiAngryFill onClick={() => handleReactionChange('angry')} size={80} color='crimson' />;
    } else if (reactionType === 'wow') {
      return <ImHappy2 size={80} onClick={() => handleReactionChange('wow')} color="#FFDD8B" />;
    } else if (reactionType === 'love') {
      return <FcLike onClick={() => handleReactionChange('love')} size={80} color="#FFDD8B" />;
    } else {
      return <SlLike onClick={() => handleReactionChange('like')} size={80} color={reactionType && "#89CFF0"} />;
    }
  };

  return (
    <div>
      {/* Display the reaction selection div if isReactionDivOpen is true */}
      {isReactionDivOpen && (
        <div className='flex gap-4 p-2 mt-4 ml-4 shadow-lg border justify-center items-center bg-white border-gray-400 w-[30%] rounded-lg'>
          <SlLike size={reactionType === 'like' ? 140 : 80} onClick={() => handleReactionChange('like')} color="#89CFF0" />
          <BsFillEmojiAngryFill size={reactionType === 'angry' ? 140 : 80} onClick={() => handleReactionChange('angry')} color='crimson' />
          <ImHappy2 size={reactionType === 'wow' ? 140 : 80} onClick={() => handleReactionChange('wow')} color="#FFDD8B" />
          <FcLike size={reactionType === 'love' ? 140 : 80} onClick={() => handleReactionChange('love')} color="crimson" />
        </div>
      )}
      {/* Display the selected reaction or the default like reaction */}
      <div className='m-2 shadow-lg w-20' onMouseEnter={() => setIsReactionDivOpen(true)}>
        {generateSelectedReaction()}
      </div>
      {/* Display the count of each reaction type */}
      <div className='flex gap-6 shadow-lg m-4'>
        <div>angry: {postReactions.angry}</div>
        <div>wow: {postReactions.wow}</div>
        <div>like: {postReactions.like}</div>
        <div>love: {postReactions.love}</div>
      </div>
    </div>
  );
}

export default Reaction;
