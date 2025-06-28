import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  ArrowLeft,
  Waves,
  Calendar,
  MapPin,
  User,
  FileText,
  Camera,
  Plus,
} from "lucide-react";

export const CreateMaintenance: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    address: "",
    date: "",
    time: "",
    type: "",
    technician: "",
    priority: "media",
    description: "",
    dimensions: {
      length: "",
      width: "",
      depth: "",
      volume: "",
    },
    chemicals: {
      ph: "",
      chlorine: "",
      alkalinity: "",
      temperature: "",
    },
    equipment: {
      pump: "",
      filter: "",
      heating: "",
      automation: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev.dimensions],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const calculateVolume = () => {
    const { length, width, depth } = formData.dimensions;
    if (length && width && depth) {
      const volume = (
        parseFloat(length) *
        parseFloat(width) *
        parseFloat(depth)
      ).toFixed(2);
      setFormData((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, volume },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria feita a submissão para o servidor
    console.log("Nova manutenção criada:", formData);
    navigate("/pool-maintenance");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/pool-maintenance">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Waves className="h-8 w-8 text-leirisonda-primary" />
            Nova Manutenção de Piscina
          </h1>
          <p className="text-gray-600 mt-1">
            Criar uma nova manutenção programada
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Nome da Piscina *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: Piscina Residencial A"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Tipo de Manutenção *</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecionar tipo</option>
                  <option value="limpeza">Limpeza Geral</option>
                  <option value="quimica">Tratamento Químico</option>
                  <option value="equipamentos">
                    Verificação de Equipamentos
                  </option>
                  <option value="completa">Manutenção Completa</option>
                  <option value="reparacao">Reparação</option>
                  <option value="instalacao">Instalação</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Localização *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ex: Vila Nova de Gaia"
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Morada Completa</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Rua, número, código postal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Data *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Hora *</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="technician">Técnico Responsável *</Label>
              <select
                id="technician"
                name="technician"
                value={formData.technician}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Selecionar técnico</option>
                <option value="João Silva">João Silva</option>
                <option value="Maria Santos">Maria Santos</option>
                <option value="Pedro Costa">Pedro Costa</option>
                <option value="Ana Rodrigues">Ana Rodrigues</option>
                <option value="Carlos Ferreira">Carlos Ferreira</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Detalhes sobre a manutenção a realizar..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Cubicagem de Água */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-5 w-5" />
              Cubicagem de Água
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="dimensions.length">Comprimento (m)</Label>
                <Input
                  id="dimensions.length"
                  name="dimensions.length"
                  type="number"
                  step="0.1"
                  value={formData.dimensions.length}
                  onChange={handleInputChange}
                  onBlur={calculateVolume}
                  placeholder="0.0"
                />
              </div>
              <div>
                <Label htmlFor="dimensions.width">Largura (m)</Label>
                <Input
                  id="dimensions.width"
                  name="dimensions.width"
                  type="number"
                  step="0.1"
                  value={formData.dimensions.width}
                  onChange={handleInputChange}
                  onBlur={calculateVolume}
                  placeholder="0.0"
                />
              </div>
              <div>
                <Label htmlFor="dimensions.depth">Profundidade (m)</Label>
                <Input
                  id="dimensions.depth"
                  name="dimensions.depth"
                  type="number"
                  step="0.1"
                  value={formData.dimensions.depth}
                  onChange={handleInputChange}
                  onBlur={calculateVolume}
                  placeholder="0.0"
                />
              </div>
              <div>
                <Label htmlFor="dimensions.volume">Volume (m³)</Label>
                <Input
                  id="dimensions.volume"
                  name="dimensions.volume"
                  type="number"
                  step="0.1"
                  value={formData.dimensions.volume}
                  onChange={handleInputChange}
                  placeholder="0.0"
                  className="bg-gray-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Análise Química */}
        <Card>
          <CardHeader>
            <CardTitle>Análise Química da Água</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="chemicals.ph">pH</Label>
                <Input
                  id="chemicals.ph"
                  name="chemicals.ph"
                  type="number"
                  step="0.1"
                  value={formData.chemicals.ph}
                  onChange={handleInputChange}
                  placeholder="7.0"
                />
              </div>
              <div>
                <Label htmlFor="chemicals.chlorine">Cloro (mg/L)</Label>
                <Input
                  id="chemicals.chlorine"
                  name="chemicals.chlorine"
                  type="number"
                  step="0.1"
                  value={formData.chemicals.chlorine}
                  onChange={handleInputChange}
                  placeholder="1.0"
                />
              </div>
              <div>
                <Label htmlFor="chemicals.alkalinity">
                  Alcalinidade (mg/L)
                </Label>
                <Input
                  id="chemicals.alkalinity"
                  name="chemicals.alkalinity"
                  type="number"
                  step="1"
                  value={formData.chemicals.alkalinity}
                  onChange={handleInputChange}
                  placeholder="120"
                />
              </div>
              <div>
                <Label htmlFor="chemicals.temperature">Temperatura (°C)</Label>
                <Input
                  id="chemicals.temperature"
                  name="chemicals.temperature"
                  type="number"
                  step="0.1"
                  value={formData.chemicals.temperature}
                  onChange={handleInputChange}
                  placeholder="25.0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Estado dos Equipamentos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="equipment.pump">Bomba</Label>
                <select
                  id="equipment.pump"
                  name="equipment.pump"
                  value={formData.equipment.pump}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Não verificado</option>
                  <option value="ok">Funcionando</option>
                  <option value="manutencao">Precisa manutenção</option>
                  <option value="avariado">Avariado</option>
                </select>
              </div>
              <div>
                <Label htmlFor="equipment.filter">Filtro</Label>
                <select
                  id="equipment.filter"
                  name="equipment.filter"
                  value={formData.equipment.filter}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Não verificado</option>
                  <option value="ok">Funcionando</option>
                  <option value="manutencao">Precisa manutenção</option>
                  <option value="avariado">Avariado</option>
                </select>
              </div>
              <div>
                <Label htmlFor="equipment.heating">Aquecimento</Label>
                <select
                  id="equipment.heating"
                  name="equipment.heating"
                  value={formData.equipment.heating}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Não verificado</option>
                  <option value="ok">Funcionando</option>
                  <option value="manutencao">Precisa manutenção</option>
                  <option value="avariado">Avariado</option>
                  <option value="n/a">Não aplicável</option>
                </select>
              </div>
              <div>
                <Label htmlFor="equipment.automation">Automação</Label>
                <select
                  id="equipment.automation"
                  name="equipment.automation"
                  value={formData.equipment.automation}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Não verificado</option>
                  <option value="ok">Funcionando</option>
                  <option value="manutencao">Precisa manutenção</option>
                  <option value="avariado">Avariado</option>
                  <option value="n/a">Não aplicável</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fotos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Galeria de Fotos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Arraste fotos aqui ou clique para selecionar
              </p>
              <p className="text-sm text-gray-400">PNG, JPG até 10MB cada</p>
              <Button type="button" variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Fotos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button type="button" variant="outline" asChild>
            <Link to="/pool-maintenance">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            className="bg-leirisonda-primary hover:bg-leirisonda-primary/90"
          >
            Criar Manutenção
          </Button>
        </div>
      </form>
    </div>
  );
};
