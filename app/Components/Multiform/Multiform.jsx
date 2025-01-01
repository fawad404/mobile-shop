'use client'

import { useState, useEffect } from 'react'
import { Card } from '../../Components/ui/card'
import { Button } from '../../Components/ui/button'
import { Tablet, Smartphone, Clock, Settings, Check, ChevronLeft, ChevronRight, Laptop ,Send } from 'lucide-react'

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    category: '',
    manufacturer: '',
    model: '',
    problem: '',
    type: '',
    dateTime: '',
    details: ''
  })
  const [animation, setAnimation] = useState('')
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    setAnimation('fade-in')
    setShowCheck(true)
    const animationTimer = setTimeout(() => setAnimation(''), 800) // Increased from 500
    const checkTimer = setTimeout(() => setShowCheck(false), 2000) // Show check for 2 seconds
    
    return () => {
      clearTimeout(animationTimer)
      clearTimeout(checkTimer)
    }
  }, [currentStep])

  const styles = {
    checkmark: `
      opacity: 0;
      transform: scale(0);
      transition: all 0.5s ease-in-out;
    `,
    checkmarkVisible: `
      opacity: 1;
      transform: scale(1);
    `,
    cardTransition: `
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `,
    button: `
      px-6 py-3 text-lg transition-all duration-300
      transform hover:scale-105 hover:shadow-lg
    `,
    card: `
      p-6 cursor-pointer relative overflow-hidden
      transform transition-all duration-500 ease-in-out
      hover:scale-105 hover:shadow-lg
      border border-gray-300 rounded-lg
    `,
    progressBar: `
      absolute h-2 bg-black rounded-full transition-all duration-500 ease-in-out
    `
  }

  const steps = [
    { id: 1, title: 'Repair Category' },
    { id: 2, title: 'Manufacturer' },
    { id: 3, title: 'Model' },
    { id: 4, title: 'Problem' },
    { id: 5, title: 'Type' },
    { id: 6, title: 'Date & Time' },
    { id: 7, title: 'Details' }
  ]

  const manufacturers = [
    { name: 'Apple', id: 'apple' },
    { name: 'Samsung', id: 'samsung' },
    { name: 'Huawei', id: 'huawei' },
    { name: 'Asus', id: 'asus' },
    { name: 'Lenovo', id: 'lenovo' },
    { name: 'Amazon', id: 'amazon' },
    { name: 'Alcatel', id: 'alcatel' },
    { name: 'LG', id: 'lg' }
  ]

  const categories = [
    { name: 'Tablet / iPad', id: 'tablet', icon: Tablet },
    { name: 'Smartphone', id: 'smartphone', icon: Smartphone },
    { name: 'Laptop', id: 'laptop', icon: Laptop }
  ]

  const problems = [
    { name: 'Screen Repair', id: 'screen' },
    { name: 'Battery Replacement', id: 'battery' },
    { name: 'Software Issue', id: 'software' },
    { name: 'Water Damage', id: 'water' }
  ]

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowCheck(true);
    
    // Add a delay before moving to next step
    setTimeout(() => {
      if (currentStep < 7) {
        setCurrentStep(prev => prev + 1);
      }
    }, 1000); // Wait for 1 second before transitioning
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Form Data:', formData)
  }

  const isStepCompleted = (stepId) => {
    switch (stepId) {
      case 1: return !!formData.category
      case 2: return !!formData.manufacturer
      case 3: return !!formData.model
      case 4: return !!formData.problem
      case 5: return !!formData.type
      case 6: return !!formData.dateTime
      case 7: return !!formData.details
      default: return false
    }
  }

  const renderCheckmark = (isSelected) => {
    if (!isSelected) return null;
    
    return (
      <div 
        className={`absolute top-2 right-2 bg-green-500 text-white rounded-full p-1.5
          transform transition-all duration-500 ease-in-out
          ${showCheck ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
      >
        <Check size={16} className="transform transition-transform duration-300" />
      </div>
    );
  };

  const getCardClassName = (isSelected) => `
    ${styles.card}
    ${isSelected ? 'border-primary bg-primary/10' : ''}
    ${animation}
  `;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(category => (
              <Card
                key={category.id}
                className={getCardClassName(formData.category === category.id)}
                onClick={() => handleSelect('category', category.id)}
              >
                <div className="flex flex-col items-center gap-4">
                  <category.icon size={48} className={`text-primary transition-colors duration-300`} />
                  <span className="font-medium text-lg">{category.name}</span>
                </div>
                {renderCheckmark(formData.category === category.id)}
              </Card>
            ))}
          </div>
        )
      case 2:
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {manufacturers.map(manufacturer => (
              <Card
                key={manufacturer.id}
                className={getCardClassName(formData.manufacturer === manufacturer.id)}
                onClick={() => handleSelect('manufacturer', manufacturer.id)}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="font-medium text-lg">{manufacturer.name}</span>
                </div>
                {renderCheckmark(formData.manufacturer === manufacturer.id)}
              </Card>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['latest', 'older'].map(modelType => (
              <Card
                key={modelType}
                className={getCardClassName(formData.model === modelType)}
                onClick={() => handleSelect('model', modelType)}
              >
                <div className="text-center text-lg font-medium">
                  {modelType === 'latest' ? 'Latest Model' : 'Older Model'}
                </div>
                {renderCheckmark(formData.model === modelType)}
              </Card>
            ))}
          </div>
        )
      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map(problem => (
              <Card
                key={problem.id}
                className={getCardClassName(formData.problem === problem.id)}
                onClick={() => handleSelect('problem', problem.id)}
              >
                <div className="flex flex-col items-center gap-4">
                  <Settings size={36} className="text-primary" />
                  <span className="font-medium text-lg">{problem.name}</span>
                </div>
                {renderCheckmark(formData.problem === problem.id)}
              </Card>
            ))}
          </div>
        )
      case 5:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['standard', 'express'].map(repairType => (
              <Card
                key={repairType}
                className={getCardClassName(formData.type === repairType)}
                onClick={() => handleSelect('type', repairType)}
              >
                <div className="text-center text-lg font-medium">
                  {repairType === 'standard' ? 'Standard Repair' : 'Express Repair'}
                </div>
                {renderCheckmark(formData.type === repairType)}
              </Card>
            ))}
          </div>
        )
      case 6:
        return (
          <div className="grid grid-cols-1 gap-6">
            <Card className={`p-6 ${animation} relative overflow-hidden`}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Clock size={36} className="text-primary" />
                  <span className="font-medium text-lg">Select Date & Time</span>
                </div>
                <input
                  type="datetime-local"
                  className="w-full p-3 border rounded-md text-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  onChange={(e) => handleSelect('dateTime', e.target.value)}
                  value={formData.dateTime}
                />
              </div>
              {renderCheckmark(formData.dateTime)}
            </Card>
          </div>
        )
      case 7:
        return (
          <div className="grid grid-cols-1 gap-6">
            <Card className={`p-6 ${animation} relative overflow-hidden`}>
              <div className="flex flex-col gap-4">
                <textarea
                  className="w-full p-3 border rounded-md h-40 text-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Additional details..."
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  value={formData.details}
                />
               <Button 
                type="submit" 
                onClick={handleSubmit}
                className="w-full py-4 bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-[1.02] transition-all duration-200"
              >
                Send Message
                <Send className="ml-2" size={16} />
              </Button>
              </div>
              {renderCheckmark(formData.details)}
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  // Add this new function to calculate progress
  const calculateProgress = () => {
    const totalSteps = steps.length - 1; // Subtract 1 since we're calculating percentages
    const currentProgress = ((currentStep - 1) / totalSteps) * 100;
    let completedProgress = 0;
    
    // Only count completed steps up to current step
    for (let i = 1; i <= currentStep; i++) {
      if (isStepCompleted(i)) {
        completedProgress = ((i - 1) / totalSteps) * 100;
      }
    }
    
    // Return the larger of current step progress or completed progress
    return Math.max(currentProgress, completedProgress);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white shadow-lg rounded-lg mb-10">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          {steps.map(step => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                currentStep === step.id
                  ? 'text-primary'
                  : isStepCompleted(step.id)
                  ? 'text-green-500'
                  : 'text-gray-400'
              }`}
            >
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300 ${
                currentStep === step.id
                  ? 'border-primary bg-primary text-gray-200'
                  : isStepCompleted(step.id)
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-300'
              }`}>
                {isStepCompleted(step.id) ? <Check size={20} /> : step.id}
              </div>
              <div className="hidden md:block text-sm font-medium">{step.title}</div>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={styles.progressBar}
            style={{ 
              width: `${calculateProgress()}%`,
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {(() => {
            switch (currentStep) {
              case 1:
                return <span>Choose Your Device <span className="text-primary">Category</span></span>
              case 2:
                return <span>Please Choose Device <span className="text-primary">Manufacturer</span></span>
              case 3:
                return <span>Select Your Device <span className="text-primary">Model</span></span>
              case 4:
                return <span>What's The <span className="text-primary">Problem</span>?</span>
              case 5:
                return <span>Choose Repair <span className="text-primary">Type</span></span>
              case 6:
                return <span>Select Preferred <span className="text-primary">Date & Time</span></span>
              case 7:
                return <span>Additional <span className="text-primary">Details</span></span>
              default:
                return `Step ${currentStep}: ${steps[currentStep - 1].title}`
            }
          })()}
        </h2>
        {renderStep()}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`${styles.button} bg-gray-100`}
        >
          <ChevronLeft className="mr-2" size={24} />
          Back
        </Button>
        {currentStep < 7 && (
          <Button
            onClick={() => setCurrentStep(prev => prev + 1)}
            className={`${styles.button} bg-primary text-white`}
          >
            Next
            <ChevronRight className="ml-2" size={24} />
          </Button>
        )}
      </div>
    </div>
  )
}

