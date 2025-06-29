
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Download, Eye, Calendar, Receipt, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentVault = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'Electricity Bill - June 2024',
      type: 'bill',
      date: '2024-06-30',
      size: '245 KB',
      status: 'paid'
    },
    {
      id: 2,
      name: 'Electricity Bill - May 2024',
      type: 'bill',
      date: '2024-05-31',
      size: '238 KB',
      status: 'paid'
    },
    {
      id: 3,
      name: 'Payment Receipt - May 2024',
      type: 'receipt',
      date: '2024-06-05',
      size: '156 KB',
      status: 'completed'
    },
    {
      id: 4,
      name: 'Connection Agreement',
      type: 'agreement',
      date: '2023-12-15',
      size: '1.2 MB',
      status: 'active'
    },
    {
      id: 5,
      name: 'Complaint Receipt - TR001234',
      type: 'complaint',
      date: '2024-06-20',
      size: '89 KB',
      status: 'resolved'
    },
    {
      id: 6,
      name: 'Meter Reading Certificate',
      type: 'certificate',
      date: '2024-06-01',
      size: '324 KB',
      status: 'valid'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Documents', count: documents.length },
    { id: 'bill', label: 'Bills', count: documents.filter(d => d.type === 'bill').length },
    { id: 'receipt', label: 'Receipts', count: documents.filter(d => d.type === 'receipt').length },
    { id: 'complaint', label: 'Complaints', count: documents.filter(d => d.type === 'complaint').length },
    { id: 'certificate', label: 'Certificates', count: documents.filter(d => d.type === 'certificate').length }
  ];

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === selectedCategory);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'bill': return <FileText className="text-blue-600" size={20} />;
      case 'receipt': return <Receipt className="text-green-600" size={20} />;
      case 'complaint': return <AlertCircle className="text-orange-600" size={20} />;
      default: return <FileText className="text-muted-foreground" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': case 'completed': case 'resolved': case 'valid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const handleDownload = (doc: any) => {
    // Simulate document download
    const content = `Document: ${doc.name}\nDate: ${doc.date}\nType: ${doc.type}\nStatus: ${doc.status}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.name.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Document Vault</h1>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <FileText className="text-purple-600" size={24} />
            <div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">Secure Storage</h3>
              <p className="text-sm text-purple-600 dark:text-purple-300">All your electricity-related documents in one place</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="h-auto p-3 flex flex-col items-center gap-1"
              >
                <span className="font-medium">{category.label}</span>
                <span className="text-xs opacity-70">({category.count})</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {getDocumentIcon(doc.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{doc.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{new Date(doc.date).toLocaleDateString()}</span>
                    </div>
                    <span>{doc.size}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Eye size={14} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="text-muted-foreground mx-auto mb-4" size={48} />
            <h3 className="font-semibold text-muted-foreground mb-2">No Documents Found</h3>
            <p className="text-sm text-muted-foreground">
              No documents available in the selected category.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Storage Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Storage Used</p>
              <p className="text-sm text-muted-foreground">6.2 MB of 100 MB</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">93.8 MB</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-3">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '6.2%' }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentVault;
