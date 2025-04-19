// Code templates for different languages

export const templates = {
  javascript: [
    {
      name: 'React Component',
      code: `import React, { useState, useEffect } from 'react';

function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // Component did mount
    return () => {
      // Component will unmount
    };
  }, []);
  
  const handleClick = () => {
    setState(newState);
  };
  
  return (
    <div className="my-component">
      <h2>{prop1}</h2>
      <p>{prop2}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default MyComponent;`
    },
    {
      name: 'Express Route',
      code: `const express = require('express');
const router = express.Router();

// Middleware for this route
router.use((req, res, next) => {
  // Do something with the request
  next();
});

// GET endpoint
router.get('/', (req, res) => {
  res.json({ message: 'GET request successful' });
});

// POST endpoint
router.post('/', (req, res) => {
  const data = req.body;
  // Process the data
  res.status(201).json({ message: 'Resource created', data });
});

// PUT endpoint
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  // Update the resource
  res.json({ message: \`Resource \${id} updated\`, data });
});

// DELETE endpoint
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  // Delete the resource
  res.json({ message: \`Resource \${id} deleted\` });
});

module.exports = router;`
    },
    {
      name: 'API Function',
      code: `/**
 * Fetches data from the API
 * @param {string} endpoint - The API endpoint
 * @param {Object} options - Request options
 * @returns {Promise<Object>} The response data
 */
async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(\`https://api.example.com/\${endpoint}\`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}`
    }
  ],
  python: [
    {
      name: 'Flask API',
      code: `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/items', methods=['GET'])
def get_items():
    # Get all items
    items = [
        {'id': 1, 'name': 'Item 1'},
        {'id': 2, 'name': 'Item 2'}
    ]
    return jsonify(items)

@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    # Get a specific item
    item = {'id': item_id, 'name': f'Item {item_id}'}
    return jsonify(item)

@app.route('/api/items', methods=['POST'])
def create_item():
    # Create a new item
    data = request.get_json()
    # Process the data
    return jsonify({'message': 'Item created', 'data': data}), 201

@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    # Update an item
    data = request.get_json()
    # Process the data
    return jsonify({'message': f'Item {item_id} updated', 'data': data})

@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    # Delete an item
    return jsonify({'message': f'Item {item_id} deleted'})

if __name__ == '__main__':
    app.run(debug=True)`
    },
    {
      name: 'Class Definition',
      code: `class MyClass:
    """
    A class that represents a MyClass object.
    
    Attributes:
        name (str): The name of the object
        value (int): The value of the object
    """
    
    def __init__(self, name, value=0):
        """
        Initialize a new MyClass instance.
        
        Args:
            name (str): The name of the object
            value (int, optional): The value of the object. Defaults to 0.
        """
        self.name = name
        self.value = value
        self._private_attr = None
    
    def get_info(self):
        """
        Get information about the object.
        
        Returns:
            dict: A dictionary containing the object's information
        """
        return {
            'name': self.name,
            'value': self.value
        }
    
    def increment_value(self, amount=1):
        """
        Increment the object's value.
        
        Args:
            amount (int, optional): The amount to increment by. Defaults to 1.
            
        Returns:
            int: The new value
        """
        self.value += amount
        return self.value
    
    @property
    def private_attr(self):
        """Get the private attribute."""
        return self._private_attr
    
    @private_attr.setter
    def private_attr(self, value):
        """Set the private attribute."""
        self._private_attr = value
    
    def __str__(self):
        """String representation of the object."""
        return f"MyClass(name={self.name}, value={self.value})"`
    }
  ],
  java: [
    {
      name: 'Spring Controller',
      code: `package com.example.demo.controller;

import com.example.demo.model.Item;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.findAll();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable("id") Long id) {
        Item item = itemService.findById(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item newItem = itemService.save(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable("id") Long id, @RequestBody Item item) {
        item.setId(id);
        Item updatedItem = itemService.update(item);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteItem(@PathVariable("id") Long id) {
        itemService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}`
    }
  ],
  csharp: [
    {
      name: 'ASP.NET Controller',
      code: `using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using YourNamespace.Models;
using YourNamespace.Services;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await _itemService.GetAllItemsAsync();
            return Ok(items);
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _itemService.GetItemByIdAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST: api/Items
        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(Item item)
        {
            var createdItem = await _itemService.CreateItemAsync(item);
            return CreatedAtAction(nameof(GetItem), new { id = createdItem.Id }, createdItem);
        }

        // PUT: api/Items/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            var updated = await _itemService.UpdateItemAsync(item);
            
            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var deleted = await _itemService.DeleteItemAsync(id);
            
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}`
    }
  ],
  cpp: [
    {
      name: 'Class Definition',
      code: `#include <iostream>
#include <string>
#include <vector>

class MyClass {
private:
    std::string name;
    int value;
    std::vector<int> data;

public:
    // Constructor
    MyClass(const std::string& name, int value = 0) 
        : name(name), value(value) {
        std::cout << "MyClass constructor called" << std::endl;
    }
    
    // Copy constructor
    MyClass(const MyClass& other) 
        : name(other.name), value(other.value), data(other.data) {
        std::cout << "MyClass copy constructor called" << std::endl;
    }
    
    // Move constructor
    MyClass(MyClass&& other) noexcept 
        : name(std::move(other.name)), value(other.value), data(std::move(other.data)) {
        other.value = 0;
        std::cout << "MyClass move constructor called" << std::endl;
    }
    
    // Destructor
    ~MyClass() {
        std::cout << "MyClass destructor called" << std::endl;
    }
    
    // Getters
    const std::string& getName() const { return name; }
    int getValue() const { return value; }
    
    // Setters
    void setName(const std::string& newName) { name = newName; }
    void setValue(int newValue) { value = newValue; }
    
    // Add data
    void addData(int item) {
        data.push_back(item);
    }
    
    // Print info
    void printInfo() const {
        std::cout << "Name: " << name << ", Value: " << value << std::endl;
        std::cout << "Data: ";
        for (const auto& item : data) {
            std::cout << item << " ";
        }
        std::cout << std::endl;
    }
};

int main() {
    // Create an instance
    MyClass obj("Example", 42);
    
    // Use the object
    obj.addData(10);
    obj.addData(20);
    obj.addData(30);
    
    obj.printInfo();
    
    // Change values
    obj.setName("Modified Example");
    obj.setValue(100);
    
    obj.printInfo();
    
    return 0;
}`
    }
  ]
};

// Get templates for a specific language
export const getTemplatesForLanguage = (language) => {
  return templates[language] || [];
};

export default templates;
