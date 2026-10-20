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
      alert('Unsupported file format. Please upload a CSV, PDF, or TXT medical file.');
      return;
    }

    if (file.size > maxSizeBytes) {
      alert('File size exceeds 5 MB limit. Please select a smaller report.');
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
          <div className="selected-file-display" onClick={(e) => e.stopPropagation()}>
            <div className="selected-file-main">
              <div className="selected-file-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="selected-file-meta">
                <div className="selected-file-name">{selectedFile.name}</div>
                <div className="selected-file-size">{formatFileSize(selectedFile.size)} • Ready for AI extraction</div>
              </div>
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
              aria-label="Remove file"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="dropzone-prompt">
            <div className="dropzone-prompt-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h3 className="dropzone-title">Drag & drop your medical report here</h3>
            <p className="dropzone-subtitle">or click to browse from your device</p>
            <span className="file-support-pill">Supported Formats: CSV • PDF • TXT (Max 5 MB)</span>
          </div>
        )}
      </div>

      {error && (
        <div className="auth-alert auth-alert-error mt-3" style={{ margin: '1rem 0 0' }}>
          <div className="auth-alert-content">{error}</div>
        </div>
      )}
    </div>
  );
}

export default FileDropzone;
