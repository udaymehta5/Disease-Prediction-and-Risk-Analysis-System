import React, { useState, useRef } from 'react';

function FileDropzone({ onFileSelected, selectedFile, error, clearError }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const allowedExtensions = ['.csv', '.pdf', '.txt'];
  const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

  const validateAndSelectFile = (file) => {
    if (!file) return;

    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      alert('Unsupported file format. Please upload a CSV, PDF, or TXT file.');
      return;
    }

    if (file.size > maxSizeBytes) {
      alert('File is too large. Maximum allowed size is 5 MB.');
      return;
    }

    if (clearError) clearError();
    onFileSelected(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="dropzone-wrapper">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".csv,.pdf,.txt"
        style={{ display: 'none' }}
      />

      <div
        className={`dropzone-area ${isDragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        role="button"
        tabIndex={0}
      >
        {selectedFile ? (
          <div className="selected-file-info">
            <div className="file-icon">📄</div>
            <div className="file-details">
              <strong>{selectedFile.name}</strong>
              <span>{formatFileSize(selectedFile.size)}</span>
            </div>
            <button
              type="button"
              className="btn-remove-file"
              onClick={(e) => {
                e.stopPropagation();
                onFileSelected(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              title="Remove file"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="dropzone-prompt">
            <div className="prompt-icon">📁</div>
            <h4>Drag & drop your medical file here</h4>
            <p>or click to browse from your computer</p>
            <span className="file-support-hint">Supported formats: CSV, PDF, TXT (Max 5 MB)</span>
          </div>
        )}
      </div>

      {error && <div className="dropzone-error">{error}</div>}
    </div>
  );
}

export default FileDropzone;
