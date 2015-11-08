//
//  GLDataModel.h
//  iOSGLEssentials
//
//  Created by Danny Flax on 3/15/15.
//
//

#import <Foundation/Foundation.h>
#import <CoreMotion/CoreMotion.h>
#import <CoreLocation/CoreLocation.h>
@interface GLDataModel : NSObject
@property (nonatomic) CMRotationMatrix rMat;
@property (nonatomic) float bounceZ;
@property (nonatomic) float yaw;
@property (nonatomic) float alpha;
@end
