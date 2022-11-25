import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostImage from '../PostImage';

function PostImageModal({ images, setImages }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='button' onClick={() => setShowModal(true)}>Add A Drink</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostImage setShowModal={setShowModal} images={images} setImages={setImages} />
                </Modal>
            )}
        </>
    );
}

export default PostImageModal;
