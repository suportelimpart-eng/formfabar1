import React, { useState } from 'react';
import { Wine, Calendar, MapPin, Users, Martini, CreditCard, Send, CheckCircle, User, Phone } from 'lucide-react';

interface FormData {
  fullName: string;
  whatsapp: string;
  eventType: string;
  beverageTypes: string[];
  date: string;
  time: string;
  location: string;
  guestCount: string;
  services: string[];
  drinkPreferences: string;
  customization: string;
  paymentMethod: string;
}

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    whatsapp: '',
    eventType: '',
    beverageTypes: [],
    date: '',
    time: '',
    location: '',
    guestCount: '',
    services: [],
    drinkPreferences: '',
    customization: '',
    paymentMethod: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBeverageChange = (beverage: string) => {
    setFormData(prev => ({
      ...prev,
      beverageTypes: prev.beverageTypes.includes(beverage)
        ? prev.beverageTypes.filter(b => b !== beverage)
        : [...prev.beverageTypes, beverage]
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handlePaymentChange = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const formatWhatsAppMessage = () => {
    // Format date correctly without timezone issues
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };

    const message = `*SOLICITAÇÃO DE ORÇAMENTO - FABARDRINKS*

*DADOS PESSOAIS:*
Nome: ${formData.fullName}
WhatsApp: ${formData.whatsapp}

*DETALHES DO EVENTO:*
Tipo: ${formData.eventType}
Data: ${formatDate(formData.date)}
Horário: ${formData.time}
Local: ${formData.location}
Número de convidados: ${formData.guestCount}

*BEBIDAS:*
Tipos selecionados: ${formData.beverageTypes.length > 0 ? formData.beverageTypes.join(', ') : 'Nenhum selecionado'}

*SERVIÇOS:*
${formData.services.map(service => `- ${service}`).join('\n')}

*PREFERÊNCIAS DE DRINKS:*
${formData.drinkPreferences}

*PERSONALIZAÇÃO:*
${formData.customization || 'Nenhuma personalização solicitada'}

*FORMA DE PAGAMENTO:*
${formData.paymentMethod}

Aguardo o orçamento detalhado!`;

    return message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Número do WhatsApp da FabarDrinks
    const whatsappNumber = '556191362933';
    const message = formatWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-200">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Redirecionado para WhatsApp!</h2>
          <p className="text-gray-600 mb-6">
            Sua solicitação foi formatada e enviada para o WhatsApp. Complete o envio por lá para receber seu orçamento personalizado.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Nova Solicitação
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative py-8 px-4 overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        {/* Fallback background sempre visível */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-100 to-teal-100"></div>
        
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            console.log('Erro ao carregar vídeo:', e);
            e.currentTarget.style.display = 'none';
          }}
          onLoadStart={() => console.log('Iniciando carregamento do vídeo')}
          onCanPlay={() => console.log('Vídeo pode ser reproduzido')}
          onLoadedData={() => console.log('Dados do vídeo carregados')}
          onEnded={() => console.log('Vídeo terminou')}
          style={{ 
            minWidth: '100%', 
            minHeight: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="https://talesofthecocktail.org/wp-content/uploads/2020/03/TOTC-COCKTAILS-16x9-1.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        
        {/* Overlay para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/logofabar-removebg-preview.png" 
              alt="FabarDrinks Logo" 
              className="h-32 w-auto object-contain"
            />
          </div>
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 max-w-3xl mx-auto border border-white/30">
            <p className="text-lg text-slate-700 leading-relaxed">
              Oi! Aqui é a <span className="font-semibold text-amber-600">FabarDrinks</span>  👋 Estamos animados para fazer parte do seu evento! Para prepararmos um orçamento do jeitinho certo, pode responder algumas perguntinhas rápidas?
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Personal Data Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">Seus Dados</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="(61) 9999-9999"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Event Type Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">1. Qual o tipo de evento?</h3>
            </div>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-700 font-medium"
              required
            >
              <option value="">Selecione o tipo de evento</option>
              <option value="Casamento">Casamento</option>
              <option value="Aniversário">Aniversário</option>
              <option value="Corporativo">Corporativo</option>
              <option value="Confraternização">Confraternização</option>
              <option value="Formatura">Formatura</option>
              <option value="Réveillon">Réveillon</option>
              <option value="Festa de 15 anos">Festa de 15 anos</option>
              <option value="Chá de bebê">Chá de bebê</option>
              <option value="Gospel">Gospel</option>
            </select>
          </div>

          {/* Beverage Types Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <Martini className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">2. Quais outros tipos de bebidas serão servidas?</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                'Cerveja',
                'Whisky',
                'Vinho',
                'Espumante'
              ].map((beverage) => (
                <label key={beverage} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.beverageTypes.includes(beverage)}
                    onChange={() => handleBeverageChange(beverage)}
                    className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-gray-700 font-medium">{beverage}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date and Time Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">3. Data e horário do evento?</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Data do evento</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Horário do evento</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">4. Local do evento</h3>
            </div>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Endereço completo ou nome do local"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Guest Count Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">5. Número aproximado de convidados</h3>
            </div>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleInputChange}
              placeholder="Ex: 50"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Services Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <Wine className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">6. Qual serviço você precisa?</h3>
            </div>
            <div className="space-y-4">
              {[
                'Bar completo (mão de obra + bebidas + estrutura + insumos)',
                'Apenas mão de obra (bartenders e utensílios, cliente fornece bebidas)',
                'Apenas estrutura (bancada de bar, gelo, copos, etc.)'
              ].map((service) => (
                <label key={service} className="flex items-start space-x-3 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceChange(service)}
                    className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-gray-700 leading-relaxed font-medium">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Drink Preferences Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <Martini className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">7. Preferência de drinks?</h3>
            </div>
            <textarea
              name="drinkPreferences"
              value={formData.drinkPreferences}
              onChange={handleInputChange}
              placeholder="Clássicos, autorais, com ou sem álcool, etc."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Customization Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <Wine className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">8. Precisa de alguma personalização?</h3>
            </div>
            <textarea
              name="customization"
              value={formData.customization}
              onChange={handleInputChange}
              placeholder="Temática, cardápio especial, etc."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Payment Method Block */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 mr-3 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">9. Forma de pagamento</h3>
            </div>
            <div className="space-y-4">
              {[
                'PIX',
                'Cartão com taxa da maquininha'
              ].map((method) => (
                <label key={method} className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={() => handlePaymentChange(method)}
                    className="w-5 h-5 text-orange-500 border-gray-300 focus:ring-orange-500"
                    required
                  />
                  <span className="text-gray-700 font-medium">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-4 px-8 rounded-xl hover:from-teal-700 hover:to-teal-800 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg"
            >
              <Send className="w-6 h-6" />
              <span className="text-lg">Enviar via WhatsApp</span>
            </button>
            
            <div className="text-center text-gray-600 pt-6 mt-6 border-t border-gray-100">
              <p className="text-sm leading-relaxed">
                Assim que receber essas informações, envio o orçamento detalhado! Aguardo seu retorno.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;