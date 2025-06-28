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
  Building2,
  Calendar,
  MapPin,
  User,
  FileText,
  Euro,
  Camera,
  Plus,
} from "lucide-react";

export const CreateWork: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    location: "",
    address: "",
    startDate: "",
    endDate: "",
    type: "",
    manager: "",
    budget: "",
    description: "",
    projectDetails: {
      poolType: "",
      dimensions: "",
      depth: "",
      equipment: "",
      finishing: "",
    },
    timeline: {
      planning: "",
      excavation: "",
      construction: "",
      equipment_install: "",
      finishing_work: "",
      final_inspection: "",
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
          ...prev[section as keyof typeof prev.projectDetails],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova obra criada:", formData);
    navigate("/works");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/works">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="h-8 w-8 text-leirisonda-primary" />
            Nova Obra
          </h1>
          <p className="text-gray-600 mt-1">
            Criar um novo projeto de construção ou renovação
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
                <Label htmlFor="title">Nome da Obra *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: Construção Piscina Residencial"
                  required
                />
              </div>
              <div>
                <Label htmlFor="client">Cliente *</Label>
                <Input
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  placeholder="Ex: João Santos"
                  required
                />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Tipo de Obra *</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecionar tipo</option>
                  <option value="construcao_nova">Construção Nova</option>
                  <option value="renovacao">Renovação</option>
                  <option value="reparacao">Reparação</option>
                  <option value="manutencao">Manutenção</option>
                  <option value="instalacao">Instalação de Equipamentos</option>
                </select>
              </div>
              <div>
                <Label htmlFor="manager">Gestor do Projeto *</Label>
                <select
                  id="manager"
                  name="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecionar gestor</option>
                  <option value="Carlos Silva">Carlos Silva</option>
                  <option value="Maria Costa">Maria Costa</option>
                  <option value="Pedro Ferreira">Pedro Ferreira</option>
                  <option value="Ana Rodrigues">Ana Rodrigues</option>
                  <option value="José Santos">José Santos</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startDate">Data de Início *</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">Data de Conclusão Prevista *</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="budget">Orçamento (€)</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="25000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição do Projeto</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Detalhes sobre o projeto a executar..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Detalhes da Piscina */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Especificações da Piscina
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectDetails.poolType">Tipo de Piscina</Label>
                <select
                  id="projectDetails.poolType"
                  name="projectDetails.poolType"
                  value={formData.projectDetails.poolType}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Selecionar tipo</option>
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                  <option value="desportiva">Desportiva</option>
                  <option value="spa">SPA/Wellness</option>
                  <option value="infantil">Infantil</option>
                </select>
              </div>
              <div>
                <Label htmlFor="projectDetails.dimensions">Dimensões</Label>
                <Input
                  id="projectDetails.dimensions"
                  name="projectDetails.dimensions"
                  value={formData.projectDetails.dimensions}
                  onChange={handleInputChange}
                  placeholder="Ex: 8m x 4m"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectDetails.depth">Profundidade</Label>
                <Input
                  id="projectDetails.depth"
                  name="projectDetails.depth"
                  value={formData.projectDetails.depth}
                  onChange={handleInputChange}
                  placeholder="Ex: 1.2m - 2.0m"
                />
              </div>
              <div>
                <Label htmlFor="projectDetails.finishing">Acabamentos</Label>
                <select
                  id="projectDetails.finishing"
                  name="projectDetails.finishing"
                  value={formData.projectDetails.finishing}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Selecionar acabamento</option>
                  <option value="azulejo">Azulejo</option>
                  <option value="liner">Liner</option>
                  <option value="vinil">Vinil</option>
                  <option value="fibra">Fibra de Vidro</option>
                  <option value="betao">Betão Armado</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="projectDetails.equipment">Equipamentos</Label>
              <textarea
                id="projectDetails.equipment"
                name="projectDetails.equipment"
                value={formData.projectDetails.equipment}
                onChange={handleInputChange}
                rows={2}
                className="flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Bombas, filtros, aquecimento, automação, iluminação..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Cronograma */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Cronograma de Execução
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeline.planning">Planeamento (dias)</Label>
                <Input
                  id="timeline.planning"
                  name="timeline.planning"
                  type="number"
                  value={formData.timeline.planning}
                  onChange={handleInputChange}
                  placeholder="7"
                />
              </div>
              <div>
                <Label htmlFor="timeline.excavation">Escavação (dias)</Label>
                <Input
                  id="timeline.excavation"
                  name="timeline.excavation"
                  type="number"
                  value={formData.timeline.excavation}
                  onChange={handleInputChange}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeline.construction">Construção (dias)</Label>
                <Input
                  id="timeline.construction"
                  name="timeline.construction"
                  type="number"
                  value={formData.timeline.construction}
                  onChange={handleInputChange}
                  placeholder="20"
                />
              </div>
              <div>
                <Label htmlFor="timeline.equipment_install">
                  Instalação Equipamentos (dias)
                </Label>
                <Input
                  id="timeline.equipment_install"
                  name="timeline.equipment_install"
                  type="number"
                  value={formData.timeline.equipment_install}
                  onChange={handleInputChange}
                  placeholder="3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeline.finishing_work">
                  Acabamentos (dias)
                </Label>
                <Input
                  id="timeline.finishing_work"
                  name="timeline.finishing_work"
                  type="number"
                  value={formData.timeline.finishing_work}
                  onChange={handleInputChange}
                  placeholder="10"
                />
              </div>
              <div>
                <Label htmlFor="timeline.final_inspection">
                  Inspeção Final (dias)
                </Label>
                <Input
                  id="timeline.final_inspection"
                  name="timeline.final_inspection"
                  type="number"
                  value={formData.timeline.final_inspection}
                  onChange={handleInputChange}
                  placeholder="2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentos e Fotos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Documentos e Fotos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Arraste documentos e fotos aqui ou clique para selecionar
              </p>
              <p className="text-sm text-gray-400">
                PDF, PNG, JPG até 10MB cada
              </p>
              <Button type="button" variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Ficheiros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button type="button" variant="outline" asChild>
            <Link to="/works">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            className="bg-leirisonda-primary hover:bg-leirisonda-primary/90"
          >
            Criar Obra
          </Button>
        </div>
      </form>
    </div>
  );
};
