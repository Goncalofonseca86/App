import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Smartphone,
  Download,
  QrCode,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Share,
  Apple,
  Settings,
} from "lucide-react";

export const MobileDeploy: React.FC = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [deployStatus, setDeployStatus] = useState<
    "success" | "building" | "error" | null
  >(null);

  const buildHistory = [
    {
      id: "1",
      version: "1.2.3",
      date: "2024-01-15 14:30",
      status: "success",
      platform: "iOS",
      downloadUrl: "#",
    },
    {
      id: "2",
      version: "1.2.2",
      date: "2024-01-14 16:45",
      status: "success",
      platform: "Android",
      downloadUrl: "#",
    },
    {
      id: "3",
      version: "1.2.1",
      date: "2024-01-13 11:20",
      status: "error",
      platform: "iOS",
      downloadUrl: null,
    },
  ];

  const handleBuild = () => {
    setIsBuilding(true);
    setDeployStatus("building");

    // Simular processo de build
    setTimeout(() => {
      setIsBuilding(false);
      setDeployStatus("success");
    }, 3000);
  };

  const handleRefresh = () => {
    console.log("Atualizar dados do app");
  };

  const statusConfig = {
    success: {
      label: "Sucesso",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    building: {
      label: "A Construir",
      color: "bg-blue-100 text-blue-800",
      icon: Clock,
    },
    error: {
      label: "Erro",
      color: "bg-red-100 text-red-800",
      icon: AlertCircle,
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Smartphone className="h-8 w-8 text-leirisonda-primary" />
          Deploy Mobile
        </h1>
        <p className="text-gray-600 mt-1">
          Gerir e distribuir aplicação móvel Leirisonda
        </p>
      </div>

      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Aplicação Leirisonda Mobile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-leirisonda-primary to-leirisonda-secondary rounded-2xl flex items-center justify-center mb-4">
                <Smartphone className="h-12 w-12 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Leirisonda - Gestão de Obras
              </h3>
              <p className="text-sm text-gray-600 mt-1">com.leirisonda.obras</p>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900">Versão Atual</h4>
                <p className="text-sm text-gray-600">1.2.3 (Build 45)</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  Última Atualização
                </h4>
                <p className="text-sm text-gray-600">15 Jan 2024, 14:30</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Tamanho</h4>
                <p className="text-sm text-gray-600">25.4 MB</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900">Plataformas</h4>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline">iOS 14+</Badge>
                  <Badge variant="outline">Android 8+</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Estado</h4>
                {deployStatus && (
                  <Badge className={statusConfig[deployStatus].color}>
                    {React.createElement(statusConfig[deployStatus].icon, {
                      className: "h-3 w-3 mr-1",
                    })}
                    {statusConfig[deployStatus].label}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deploy da Aplicação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleBuild}
              disabled={isBuilding}
              className="w-full bg-leirisonda-primary hover:bg-leirisonda-primary/90"
            >
              {isBuilding ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />A Construir
                  App...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  📱 Atualizar App
                </>
              )}
            </Button>

            <Button
              onClick={handleRefresh}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Sincronizar Dados
            </Button>

            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Download e Instalação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Digitalize o QR Code para baixar a app
              </p>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Apple className="h-4 w-4 mr-2" />
                Download para iOS
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download para Android
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share className="h-4 w-4 mr-2" />
                Partilhar Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Build History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Builds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {buildHistory.map((build) => {
              const StatusIcon =
                statusConfig[build.status as keyof typeof statusConfig]?.icon ||
                Clock;

              return (
                <div
                  key={build.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <StatusIcon
                      className={`h-5 w-5 ${
                        build.status === "success"
                          ? "text-green-500"
                          : build.status === "error"
                            ? "text-red-500"
                            : "text-blue-500"
                      }`}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Versão {build.version} - {build.platform}
                      </h4>
                      <p className="text-sm text-gray-600">{build.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        statusConfig[build.status as keyof typeof statusConfig]
                          ?.color
                      }
                    >
                      {
                        statusConfig[build.status as keyof typeof statusConfig]
                          ?.label
                      }
                    </Badge>
                    {build.downloadUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Baixar
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Download className="h-8 w-8 text-leirisonda-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-sm text-gray-600">Total Downloads</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">95%</p>
              <p className="text-sm text-gray-600">Taxa de Sucesso</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Smartphone className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">342</p>
              <p className="text-sm text-gray-600">Usuários Ativos</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">23</p>
              <p className="text-sm text-gray-600">Builds Realizados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Smartphone className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Como Instalar a App</h3>
              <ol className="text-sm text-blue-700 mt-2 space-y-1 list-decimal list-inside">
                <li>
                  Digitalize o QR Code acima ou clique no link de download
                </li>
                <li>
                  No iOS: Instale através do TestFlight ou perfil Enterprise
                </li>
                <li>
                  No Android: Ative "Fontes desconhecidas" e instale o APK
                </li>
                <li>
                  Abra a app e faça login com as suas credenciais Leirisonda
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
