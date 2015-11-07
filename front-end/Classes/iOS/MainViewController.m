/*
     File: MainViewController.m
 Abstract: The main view controller
  Version: 1.6
 
 Disclaimer: IMPORTANT:  This Apple software is supplied to you by Apple
 Inc. ("Apple") in consideration of your agreement to the following
 terms, and your use, installation, modification or redistribution of
 this Apple software constitutes acceptance of these terms.  If you do
 not agree with these terms, please do not use, install, modify or
 redistribute this Apple software.
 
 In consideration of your agreement to abide by the following terms, and
 subject to these terms, Apple grants you a personal, non-exclusive
 license, under Apple's copyrights in this original Apple software (the
 "Apple Software"), to use, reproduce, modify and redistribute the Apple
 Software, with or without modifications, in source and/or binary forms;
 provided that if you redistribute the Apple Software in its entirety and
 without modifications, you must retain this notice and the following
 text and disclaimers in all such redistributions of the Apple Software.
 Neither the name, trademarks, service marks or logos of Apple Inc. may
 be used to endorse or promote products derived from the Apple Software
 without specific prior written permission from Apple.  Except as
 expressly stated in this notice, no other rights or licenses, express or
 implied, are granted by Apple herein, including but not limited to any
 patent rights that may be infringed by your derivative works or by other
 works in which the Apple Software may be incorporated.
 
 The Apple Software is provided by Apple on an "AS IS" basis.  APPLE
 MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
 THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND
 OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS.
 
 IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL
 OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION,
 MODIFICATION AND/OR DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED
 AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE),
 STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 
 Copyright (C) 2012 Apple Inc. All Rights Reserved.
 
 */

#import "MainViewController.h"

@interface MainViewController ()

@end

@implementation MainViewController


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }

    return self;
}

- (void)viewDidLoad
{
    motionManager = [CMMotionManager new];
    [motionManager setGyroUpdateInterval:3];
    
    NSOperationQueue *queue = [NSOperationQueue new];
    
    [motionManager startDeviceMotionUpdatesToQueue:queue withHandler:^(CMDeviceMotion *data, NSError *error){
        glView.dataObj.rotationY = 180.0*data.attitude.roll/M_PI;
        glView.dataObj.rotationX = 180.0*data.attitude.pitch/M_PI;
        glView.dataObj.rotationZ = 180.0*data.attitude.yaw/M_PI;
    }];
    
    
    
    result = [[UILabel alloc] initWithFrame:CGRectMake(0.0, glView.frame.size.height - 200.0, glView.frame.size.width, 20.0)];
    [result setTextAlignment:NSTextAlignmentCenter];
    [result setFont:[UIFont fontWithName:@"helvetica" size:18.0]];
    [result setTextColor:[UIColor whiteColor]];
    [glView addSubview:result];
    [result setHidden:YES];
    
    isReturning = false;
    isSpinning = false;
    
    glView.dataObj = [GLDataModel new];
    
    [super viewDidLoad];
    
    glView.dataObj.rotationY = 50;
    glView.dataObj.rotationX = 0;
    
    ctrlTimer = [NSTimer scheduledTimerWithTimeInterval:.01 target:self selector:@selector(controlLoop) userInfo:nil repeats:YES];
    
	// Do any additional setup after loading the view.
}

-(float)getRandomLetterRotation{
    int r = rand()%4;
    lastLetter = r;
    return (float)r*90.0;
}

float dX = 0;
float dY = 0;
float dL = 0;

float iterations = 30.0;
float waitTime = 60.0;

float spinIterations = 60.0;

-(void)controlLoop{
   
}

-(void)setDisplayToResult:(int)res{
    [result setHidden:NO];
    NSString *name;
    switch (res) {
        case 0:
            name = @"Nun";
            break;
        case 1:
            name = @"Gimmel";
            break;
        case 2:
            name = @"Shin";
            break;
        case 3:
            name = @"Hay";
            break;
            
        default:
            [result setHidden:YES];
            break;
    }
    [result setText:[NSString stringWithFormat:@"You spun a %@", name]];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
