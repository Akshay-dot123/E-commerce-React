export const DeleteMessageModal = ({ onClose, onDeleteForMe, onDeleteForEveryone }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h4>Delete Message?</h4>
          <button onClick={onDeleteForMe}>Delete for Me</button>
          <button onClick={onDeleteForEveryone}>Delete for Everyone</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };
  