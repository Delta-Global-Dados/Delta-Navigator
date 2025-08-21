import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload as UploadIcon, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileInfo {
  name: string;
  size: number;
  sheets: number;
  columns: number;
  rows: number;
  lastModified: Date;
}

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [processed, setProcessed] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione um arquivo Excel (.xlsx ou .xls)",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simular upload e processamento
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setProcessed(true);
          
          // Mock file info
          setFileInfo({
            name: file.name,
            size: file.size,
            sheets: 1,
            columns: 73,
            rows: 1247,
            lastModified: new Date(file.lastModified),
          });

          toast({
            title: "Arquivo processado com sucesso!",
            description: "Os dados foram carregados e estão prontos para análise.",
          });
          
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload de Dados</h1>
        <p className="text-muted-foreground">
          Carregue seu arquivo Excel do Corban para análise
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="h-5 w-5" />
            Selecionar Arquivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileSpreadsheet className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              Arraste seu arquivo Excel aqui
            </h3>
            <p className="text-muted-foreground mb-4">
              Ou clique para selecionar um arquivo
            </p>
            <Button
              variant="outline"
              onClick={() => document.getElementById('fileInput')?.click()}
              disabled={uploading}
            >
              Selecionar Arquivo
            </Button>
            <input
              id="fileInput"
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {uploading && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processando arquivo...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Information */}
      {fileInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Arquivo Processado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{fileInfo.sheets}</p>
                <p className="text-sm text-muted-foreground">Planilhas</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{fileInfo.columns}</p>
                <p className="text-sm text-muted-foreground">Colunas</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{fileInfo.rows.toLocaleString('pt-BR')}</p>
                <p className="text-sm text-muted-foreground">Linhas</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{formatFileSize(fileInfo.size)}</p>
                <p className="text-sm text-muted-foreground">Tamanho</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20">
              <div>
                <p className="font-medium text-success">Dados carregados com sucesso!</p>
                <p className="text-sm text-muted-foreground">
                  Arquivo: {fileInfo.name} • Modificado em {fileInfo.lastModified.toLocaleDateString('pt-BR')}
                </p>
              </div>
              <Badge variant="outline" className="border-success text-success">
                Pronto
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Formato suportado:</strong> Arquivos Excel (.xlsx, .xls) com dados do Corban.
            O sistema detectará automaticamente a estrutura das colunas.
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Dicas:</strong> Certifique-se de que as datas estão no formato DD/MM/AAAA
            e que não há células mescladas na primeira linha.
          </AlertDescription>
        </Alert>
      </div>

      {/* Sample File */}
      <Card>
        <CardHeader>
          <CardTitle>Arquivo de Exemplo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Baixe um arquivo de exemplo para entender a estrutura esperada:
          </p>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Baixar Arquivo de Exemplo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}