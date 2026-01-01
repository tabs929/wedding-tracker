import { Request, Response } from 'express';
import Family from '../models/Family';

// Get all families
export const getAllFamilies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { event } = req.query;
    let filter: any = {};
    
    if (event) {
      // Support both new events array and old event field
      filter.$or = [
        { events: event },
        { event: event }
      ];
    }
    
    const families = await Family.find(filter).sort({ createdAt: -1 });
    res.json(families);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching families', error });
  }
};

// Get single family
export const getFamilyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const family = await Family.findById(req.params.id);
    if (!family) {
      res.status(404).json({ message: 'Family not found' });
      return;
    }
    res.json(family);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching family', error });
  }
};

// Create new family
export const createFamily = async (req: Request, res: Response): Promise<void> => {
  try {
    const { familyName, events, members } = req.body;
    
    const newFamily = new Family({
      familyName,
      events: events || [],
      members: members || []
    });
    
    const savedFamily = await newFamily.save();
    res.status(201).json(savedFamily);
  } catch (error) {
    res.status(400).json({ message: 'Error creating family', error });
  }
};

// Update family
export const updateFamily = async (req: Request, res: Response): Promise<void> => {
  try {
    const { familyName, events, members } = req.body;
    
    const updatedFamily = await Family.findByIdAndUpdate(
      req.params.id,
      { familyName, events, members },
      { new: true, runValidators: true }
    );
    
    if (!updatedFamily) {
      res.status(404).json({ message: 'Family not found' });
      return;
    }
    
    res.json(updatedFamily);
  } catch (error) {
    res.status(400).json({ message: 'Error updating family', error });
  }
};

// Delete family
export const deleteFamily = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedFamily = await Family.findByIdAndDelete(req.params.id);
    
    if (!deletedFamily) {
      res.status(404).json({ message: 'Family not found' });
      return;
    }
    
    res.json({ message: 'Family deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting family', error });
  }
};

// Get statistics
export const getStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const families = await Family.find();
    
    let totalMen = 0;
    let totalWomen = 0;
    
    families.forEach(family => {
      family.members.forEach(member => {
        if (member.gender === 'male') totalMen++;
        if (member.gender === 'female') totalWomen++;
      });
    });
    
    res.json({
      totalFamilies: families.length,
      totalGuests: totalMen + totalWomen,
      totalMen,
      totalWomen
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};
