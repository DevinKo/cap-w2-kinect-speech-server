import * as mocha from 'mocha';
import * as chai from 'chai';
import Session from '../src/models/session-model';

const expect = chai.expect;

// Make Mongoose use the ES6 Promise instead of mpromise
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

describe('session-model tests', function() {
    const time = Date.now();
    const calibration = {
        EndTime: time,
        StartTime: time
    };
    const id = mongoose.Types.ObjectId();
    const locateObjective = {
        AudioSnapshots: [{ Time: time }],
        BodySnapshots: [{
            Joints: [{ JointType: 'ElbowLeft' }],
            Time: time
        }],
        EndTime: time,
        StartTime: time,
        kind: 'LocateObjective'
    };
    const trial = {
        EndTime: time,
        Objectives: [ locateObjective ],
        StartTime: time
    };

    it('should be invalid without CalibrationData', done => {
        let s = new Session({
            EndTime: time,
            Patient: id,
            StartTime: time,
            Trials: [ trial ]
        });

        s.validate(err => {
            expect(err.errors.CalibrationData).to.exist;
            done();
        });
    });

    it('should be invalid without EndTime', done => {
        let s = new Session({
            CalibrationData: calibration,
            Patient: id,
            StartTime: time,
            Trials: [ trial ]
        });

        s.validate(err => {
            expect(err.errors.EndTime).to.exist;
            done();
        });
    });

    it('should be invalid without Patient', done => {
        let s = new Session({
            CalibrationData: calibration,
            EndTime: time,
            StartTime: time,
            Trials: [ trial ]
        });

        s.validate(err => {
            expect(err.errors.Patient).to.exist;
            done();
        });
    });

    it('should be invalid without StartTime', done => {
        let s = new Session({
            CalibrationData: calibration,
            EndTime: time,
            Patient: id,
            Trials: [ trial ]
        });

        s.validate(err => {
            expect(err.errors.StartTime).to.exist;
            done();
        });
    });

    it('should be invalid without Trials', done => {
        let s = new Session({
            CalibrationData: calibration,
            EndTime: time,
            Patient: id,
            StartTime: time
        });

        s.validate(err => {
            expect(err.errors.Trials).to.exist;
            done();
        });
    });
});
