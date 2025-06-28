import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Database,
  Download,
  Upload,
  FileText,
  Trash2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Search,
} from "lucide-react";

export const UserDataManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const dataCategories = [
    {
      id: "users",
      name: "Dados de Utilizadores",
      description: "Informações pessoais e profissionais",
      count: 45,
      size: "2.3 MB",
      lastUpdate: "2024-01-15",
    },
    {
      id: "works",
      name: "Dados de Obras",
      description: "Projetos, orçamentos e cronogramas",
      count: 123,
      size: "15.7 MB",
      lastUpdate: "2024-01-14",
    },
    {
      id: "maintenance",
      name: "Dados de Manutenção",
      description: "Histórico de manutenções e intervenções",
      count: 89,
      size: "8.2 MB",
      lastUpdate: "2024-01-13",
    },
    {
      id: "photos",
      name: "Fotos e Documentos",
      description: "Imagens e ficheiros anexados",
      count: 567,
      size: "234.5 MB",
      lastUpdate: "2024-01-12",
    },
  ];

  const backupHistory = [
    {
      id: "1",
      date: "2024-01-15 09:30",
      type: "Backup Automático",
      size: "267.8 MB",
      status: "sucesso",
    },
    {
      id: "2",
      date: "2024-01-14 23:00",
      type: "Backup Completo",
      size: "265.2 MB",
      status: "sucesso",
    },
    {
      id: "3",
      date: "2024-01-13 18:45",
      type: "Backup Manual",
      size: "248.9 MB",
      status: "sucesso",
    },
  ];

  const handleSelectData = (dataId: string) => {
    setSelectedData((prev) =>
      prev.includes(dataId)
        ? prev.filter((id) => id !== dataId)
        : [...prev, dataId],
    );
  };

  const handleExportData = () => {
    console.log("Exportar dados:", selectedData);
    // Aqui seria implementada a lógica de exportação
  };

  const handleImportData = () => {
    console.log("Importar dados");
    // Aqui seria implementada a lógica de importação
  };

  const handleBackup = () => {
    console.log("Criar backup");
    // Aqui seria implementada a lógica de backup
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Database className="h-8 w-8 text-leirisonda-primary" />
          Gestão de Dados
        </h1>
        <p className="text-gray-600 mt-1">
          Exportar, importar e fazer backup dos dados do sistema
        </p>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Ações Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleBackup}
              className="h-20 flex flex-col items-center justify-center bg-leirisonda-primary hover:bg-leirisonda-primary/90"
            >
              <Download className="h-6 w-6 mb-2" />
              <span>Criar Backup</span>
            </Button>

            <Button
              onClick={handleImportData}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
            >
              <Upload className="h-6 w-6 mb-2" />
              <span>Importar Dados</span>
            </Button>

            <Button
              onClick={handleExportData}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
              disabled={selectedData.length === 0}
            >
              <FileText className="h-6 w-6 mb-2" />
              <span>Exportar Selecionados</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar dados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categorias de Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataCategories
              .filter(
                (category) =>
                  category.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  category.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
              )
              .map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedData.includes(category.id)}
                      onChange={() => handleSelectData(category.id)}
                      className="rounded border-gray-300"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>{category.count} registros</span>
                        <span>{category.size}</span>
                        <span>
                          Atualizado:{" "}
                          {new Date(category.lastUpdate).toLocaleDateString(
                            "pt-PT",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Exportar
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Backups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backupHistory.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{backup.type}</h4>
                    <p className="text-sm text-gray-600">{backup.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{backup.size}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Restaurar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Database className="h-8 w-8 text-leirisonda-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">824</p>
              <p className="text-sm text-gray-600">Total de Registros</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">260.7 MB</p>
              <p className="text-sm text-gray-600">Tamanho Total</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-gray-600">Backups Criados</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-gray-600">Integridade</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warning */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Aviso Importante</h3>
              <p className="text-sm text-yellow-700 mt-1">
                As operações de exportação e importação de dados podem afetar o
                funcionamento do sistema. Recomenda-se criar um backup antes de
                realizar qualquer operação de importação.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
