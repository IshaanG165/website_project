import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Tooltip
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  Visibility as PreviewIcon
} from '@mui/icons-material';

// Sample document data with actual file sizes
const sampleDocuments = [
  {
    id: 'DOC-001',
    title: 'Strata Bylaws',
    type: 'pdf',
    category: 'Legal',
    date: '2024-01-15',
    size: '13 KB',
    url: '/documents/strata-bylaws.pdf'
  },
  {
    id: 'DOC-002',
    title: 'Building Floor Plan',
    type: 'image',
    category: 'Architecture',
    date: '2024-02-01',
    size: '800 KB',
    url: '/documents/floor-plan.jpg'
  },
  {
    id: 'DOC-003',
    title: 'Annual General Meeting Minutes',
    type: 'pdf',
    category: 'Meetings',
    date: '2024-03-10',
    size: '142 KB',
    url: '/documents/agm-minutes.pdf'
  },
  {
    id: 'DOC-004',
    title: 'Building Maintenance Schedule',
    type: 'pdf',
    category: 'Maintenance',
    date: '2024-03-20',
    size: '142 KB',
    url: '/documents/maintenance-schedule.pdf'
  },
  {
    id: 'DOC-005',
    title: 'Building Exterior',
    type: 'image',
    category: 'Photos',
    date: '2024-03-25',
    size: '1.2 MB',
    url: '/documents/building-exterior.jpg'
  }
];

const Documents = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openPreview, setOpenPreview] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  const handleDownload = async (document) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(document.url);
      if (!response.ok) throw new Error('Failed to fetch document');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = document.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download document');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (document) => {
    setSelectedDocument(document);
    setOpenPreview(true);
    setPreviewLoading(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
    setSelectedDocument(null);
    setPreviewLoading(false);
  };

  const getFileIcon = (type) => {
    return type === 'pdf' ? <PdfIcon /> : <ImageIcon />;
  };

  const formatFileSize = (size) => {
    return size;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Building Documents
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2}>
        <List>
          {sampleDocuments.map((doc, index) => (
            <React.Fragment key={doc.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <Tooltip title="Preview">
                      <IconButton
                        edge="end"
                        onClick={() => handlePreview(doc)}
                        disabled={loading}
                      >
                        <PreviewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton
                        edge="end"
                        onClick={() => handleDownload(doc)}
                        disabled={loading}
                      >
                        {loading && selectedDocument?.id === doc.id ? (
                          <CircularProgress size={24} />
                        ) : (
                          <DownloadIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              >
                <ListItemIcon>
                  {getFileIcon(doc.type)}
                </ListItemIcon>
                <ListItemText
                  primary={doc.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        Category: {doc.category}
                      </Typography>
                      <br />
                      Date: {doc.date} | Size: {formatFileSize(doc.size)}
                    </>
                  }
                />
              </ListItem>
              {index < sampleDocuments.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog
        open={openPreview}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedDocument?.title}
          <IconButton
            aria-label="close"
            onClick={handleClosePreview}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedDocument && (
            <Box sx={{ mt: 2, minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {previewLoading && (
                <CircularProgress />
              )}
              {selectedDocument.type === 'image' ? (
                <img
                  src={selectedDocument.url}
                  alt={selectedDocument.title}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    display: previewLoading ? 'none' : 'block'
                  }}
                  onLoad={() => setPreviewLoading(false)}
                />
              ) : (
                <iframe
                  src={selectedDocument.url}
                  title={selectedDocument.title}
                  style={{ 
                    width: '100%', 
                    height: '600px',
                    display: previewLoading ? 'none' : 'block'
                  }}
                  onLoad={() => setPreviewLoading(false)}
                />
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Documents; 